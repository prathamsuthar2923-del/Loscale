# LO SCALE — Website + Admin Panel

A full-stack rebuild of the LO SCALE site: a public marketing site (React) and
a CMS-style admin panel, backed by an Express + MongoDB API. Everything shown
on the homepage — services, works/case studies, team, testimonials, success
stories, and even which sections are shown at all — is editable from
`/admin` instead of being hardcoded.

This README explains how to get it running from scratch. It assumes no prior
coding experience — follow the steps in order.

## What's in here

```
loscale-agency/
├── server/     Express API + MongoDB models (the "backend")
└── client/     React site + admin panel (the "frontend")
```

The two run as separate processes on your computer (or wherever you deploy
them) and talk to each other over HTTP. In development, the client is
pre-configured to forward API requests to the server automatically, so you
don't need to worry about connecting them yourself.

## 1. Prerequisites

You'll need **Node.js** installed on your computer (version 18 or newer).
Check by opening a terminal and running:

```
node --version
```

If that fails, download and install Node from https://nodejs.org (choose the
LTS version).

You'll also need a **MongoDB connection string**. Since you mentioned you
already have a MongoDB database, grab its connection string (it looks like
`mongodb+srv://user:password@cluster.mongodb.net/dbname` for MongoDB Atlas).
If you don't have one yet, MongoDB Atlas has a free tier — create a cluster
there and copy the "Connect your application" string.

## 2. Set up the server (API)

Open a terminal, go into the `server` folder, and install its dependencies:

```
cd server
npm install
```

Copy the example environment file and fill in your own values:

```
cp .env.example .env
```

Open `.env` in a text editor and fill in at least:

- `MONGODB_URI` — your MongoDB connection string
- `JWT_SECRET` — any long random string (this signs admin login sessions —
  keep it secret, don't reuse it elsewhere)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — the login you'll use for `/admin`

Everything else has a sensible default for local development.

**Seed the database** — this creates your admin login and adds some starter
content (services, sample case studies, etc.) so the site and admin panel
aren't empty the first time you open them:

```
npm run seed
```

You can re-run this safely any time; it skips anything that already exists.

**Start the server:**

```
npm run dev
```

It should print that it's connected to MongoDB and listening on
`http://localhost:5000`. Leave this terminal running.

## 3. Set up the client (website + admin panel)

Open a **second** terminal (leave the server running in the first one), go
into the `client` folder, and install its dependencies:

```
cd client
npm install
```

Copy the example environment file:

```
cp .env.example .env
```

You can leave it as-is for local development — the dev server is already
configured to forward requests to your API automatically.

**Start the client:**

```
npm run dev
```

It will print a local URL, typically `http://localhost:5173`. Open that in
your browser — that's the live website.

The admin panel lives at `http://localhost:5173/admin`. Log in with the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in `server/.env`.

## 4. What you can manage from the admin panel

- **Services** — add, edit, delete, reorder, and show/hide each service
  shown on the homepage scroll section and the dedicated Services page.
- **Works** — full case studies with a cover image, an image gallery, a
  summary, and a full write-up, each with its own detail page
  (`/works/your-slug`).
- **Team** — name, position, photo, and a "featured" flag (featured members
  always show their name tag; others reveal it on hover) — plus a
  show/hide toggle per member.
- **Testimonials** — client quotes with an optional photo.
- **Success Stories** — richer case-study-style cards with an image, an
  optional "has video" badge, and a list of stat/label pairs (e.g. "+61% —
  Conversion rate").
- **Contact Submissions** — every message sent through the site's Contact
  form, with read/unread status.
- **Site Settings** — one place with a toggle for every homepage section
  (Hero, Who We Are, Stats, Works, Goals Row, Services, Team, Pricing,
  Testimonials, Success Stories, CTA Band), your social media links, and the
  email address contact notifications are meant to go to.

Every list resource (Services, Works, Team, Testimonials, Success Stories)
supports **show/hide** independently of deleting it — turning something off
just hides it from the live site; the data stays in the admin panel so you
can turn it back on later.

## 5. About the Contact form and email notifications

The Contact form (Full Name, Email, Subject, Description) saves every
submission to the database and shows it in **Admin → Contact Submissions**
immediately — that part works out of the box.

**Sending an email notification to `grow@loscaledigital.com` when someone
submits is built but turned off by default**, since it needs real email
credentials (an SMTP username/password) that only you can provide. To turn
it on:

1. Get SMTP credentials from an email provider (your email host, Gmail with
   an app password, or a transactional service like Resend/SendGrid's SMTP
   mode).
2. In `server`, install the mailer library: `npm install nodemailer`
3. In `server/.env`, set `EMAIL_ENABLED=true` and fill in `SMTP_HOST`,
   `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_NOTIFICATION_EMAIL`.
4. Open `server/src/utils/mailer.js` — the full sending logic is already
   written there, just commented out, with instructions inline. Uncomment
   it and restart the server.

Until then, submissions are saved and visible in the admin panel — nothing
is lost, notification email is just off.

## 6. A note on "smooth scrolling"

The very first version of this project (before the admin panel/database
existed) used a hand-written JavaScript scroll effect that intercepted your
mouse wheel to create an eased, "inertia" scrolling feel. In this rebuild,
that's been simplified to the browser's native smooth scrolling
(`scroll-behavior: smooth` in `client/src/index.css`), which respects
users' "reduce motion" accessibility settings and doesn't fight the browser
on a real multi-page site with a router. The one interactive scroll effect
that was kept is the **Services section's scroll-driven highlight/crossfade**
(`client/src/components/sections/ServicesScrollHighlight.jsx`) — as you
scroll through it, each service lights up and its image crossfades into the
next, exactly like the original design, except now it's driven by however
many services you've added in the admin panel instead of a fixed list of 4.

## 7. Deployment

This project is delivered as source code only — it is **not** deployed
anywhere yet. When you're ready to put it online, at a high level you will:

1. Deploy `server/` somewhere that can run a long-lived Node process and
   reach your MongoDB database (e.g. Render, Railway, an EC2/VPS, etc.).
   Set the same environment variables as your local `.env` there.
2. Deploy `client/` as a static build. Run `npm run build` inside `client`
   to produce a `dist` folder, then host that (Vercel, Netlify, or serving
   it from the same server). Set `VITE_API_URL` to your deployed API's URL
   before building.
3. Update `CLIENT_URL` in the server's environment to your deployed site's
   URL (used for CORS).
4. Uploaded images are currently stored on the server's local disk under
   `server/uploads`. If you deploy to a platform with an ephemeral
   filesystem (like most serverless platforms), uploads will be lost on
   redeploy — for production you'd want to swap the upload storage for
   something like Amazon S3 or Cloudinary. `server/src/middleware/upload.middleware.js`
   is the one place that would need to change.

## 8. Troubleshooting

- **"Cannot connect to MongoDB"** — double check `MONGODB_URI` in
  `server/.env`, and that your MongoDB Atlas cluster allows connections
  from your current IP address (Atlas → Network Access).
- **Admin login fails** — make sure you ran `npm run seed` after setting
  `ADMIN_USERNAME`/`ADMIN_PASSWORD`, and that the server is running.
- **Images don't show up** — the client proxies `/uploads` to the server in
  development; make sure the server (`npm run dev` inside `server`) is
  running alongside the client.
- **Port already in use** — change `PORT` in `server/.env`, and update the
  proxy target in `client/vite.config.js` to match.
