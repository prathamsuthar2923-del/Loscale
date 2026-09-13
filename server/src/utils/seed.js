/**
 * Seeds the database with a starter admin login and starter content so the
 * site and admin panel aren't empty on first run. Safe to re-run — it skips
 * anything that already exists instead of duplicating it.
 *
 * Usage:  npm run seed   (from /server, after filling in .env)
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const { adminUsername, adminPassword } = require('../config/env');

const AdminUser = require('../models/AdminUser');
const Service = require('../models/Service');
const Work = require('../models/Work');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const SuccessStory = require('../models/SuccessStory');
const PricingPlan = require('../models/PricingPlan');
const SiteSettings = require('../models/SiteSettings');

const services = [
  { title: 'Performance Marketing', tag: 'Paid Ads', slug: 'performance-marketing', order: 1 },
  { title: 'Search Engine Optimization', tag: 'SEO', slug: 'seo', order: 2 },
  { title: 'Social Media Management', tag: '& Branding', slug: 'social-media-management', order: 3 },
  { title: 'Conversion Rate Optimization', tag: 'CRO & Web Design', slug: 'conversion-rate-optimization', order: 4 },
  { title: 'Content Marketing', tag: '& Copywriting', slug: 'content-marketing', order: 5 },
  { title: 'Marketing Automation', tag: 'Paid Ads & CRM Systems', slug: 'marketing-automation', order: 6 },
].map((s) => ({
  ...s,
  description:
    'Describe this service here from the admin panel — what it includes, who it is for, and the outcomes clients can expect.',
}));

const works = [
  {
    title: 'Orion Studios',
    slug: 'orion-studios',
    client: 'Orion Studios',
    category: '3D Commercial',
    year: '2025',
    summary: 'A bold 3D commercial campaign that put Orion Studios in front of a global audience.',
    description: 'Add the full case study here from the admin panel: goals, approach, and results.',
    order: 1,
  },
  {
    title: 'Nova Retail',
    slug: 'nova-retail',
    client: 'Nova Retail',
    category: 'Performance Campaign',
    year: '2025',
    summary: 'A performance marketing push that scaled paid acquisition profitably.',
    description: 'Add the full case study here from the admin panel: goals, approach, and results.',
    order: 2,
  },
  {
    title: 'Bright Path',
    slug: 'bright-path',
    client: 'Bright Path',
    category: 'SEO & Content',
    year: '2024',
    summary: 'An SEO and content overhaul that tripled organic traffic in two quarters.',
    description: 'Add the full case study here from the admin panel: goals, approach, and results.',
    order: 3,
  },
  {
    title: 'Vertex Apps',
    slug: 'vertex-apps',
    client: 'Vertex Apps',
    category: 'Social Growth',
    year: '2024',
    summary: 'A social-first brand relaunch that grew an engaged community from zero.',
    description: 'Add the full case study here from the admin panel: goals, approach, and results.',
    order: 4,
  },
];

const team = [
  { name: 'Krishna Gupta', position: 'Founder & CEO', order: 1, featured: true },
  { name: 'Team Member', position: 'Creative Director', order: 2 },
  { name: 'Team Member', position: 'Growth Lead', order: 3 },
];

const testimonials = [
  {
    quote:
      'Loscale helped us turn scattered marketing efforts into one clear growth engine. The results spoke for themselves within the first quarter.',
    authorName: 'Add Client Name',
    authorTitle: 'Add Client Title / Company',
    order: 1,
  },
];

const successStories = [
  {
    quote:
      'We needed a full rebranding, and this agency delivered beyond our expectations. From the new logo to the website design, everything feels cohesive and professional.',
    authorName: 'Anna Karenina',
    authorTitle: 'Owner of a clothing E-commerce store',
    stats: [
      { value: '+28%', label: 'Customer retention' },
      { value: '+61%', label: 'Conversion rate' },
    ],
    order: 1,
  },
  {
    quote: 'Working with this team was a pleasure! Our sales increased by 30% in the first month. Thank you for the amazing job!',
    authorName: 'Andy Styles',
    authorTitle: 'Founder of a Tech Startup',
    hasVideo: true,
    stats: [
      { value: '+28%', label: 'Customer retention' },
      { value: '+61%', label: 'Conversion rate' },
    ],
    order: 2,
  },
];

const pricingPlans = [
  {
    name: 'Basic',
    price: '$120',
    billingNote: 'billed monthly',
    note: 'For small businesses or startups building their first digital presence.',
    features: [
      'Competitor analysis',
      'Design of homepage + up to 4 inner pages',
      'Creation of custom page prototypes',
      'Basic analytics setup (e.g., Google Analytics)',
      'Setup of a basic contact form',
      'Bug fixing and testing support',
    ],
    highlighted: false,
    order: 1,
  },
  {
    name: 'Pro',
    price: '$1,999',
    billingNote: 'billed monthly',
    note: 'For growing businesses needing more features and flexibility.',
    features: [
      'Competitor analysis',
      'Design of homepage + up to 4 inner pages',
      'Creation of custom page prototypes',
      'Basic analytics setup (e.g., Google Analytics)',
      'Setup of a basic contact form',
      'Bug fixing and testing support',
    ],
    highlighted: true,
    order: 2,
  },
  {
    name: 'Max',
    price: '$3,999',
    billingNote: 'billed monthly',
    note: 'For established brands looking for a fully tailored experience.',
    features: [
      'Competitor analysis',
      'Design of homepage + up to 4 inner pages',
      'Creation of custom page prototypes',
      'Basic analytics setup (e.g., Google Analytics)',
      'Setup of a basic contact form',
      'Bug fixing and testing support',
    ],
    highlighted: false,
    order: 3,
  },
];

async function seedCollection(Model, docs, matchField) {
  let created = 0;
  for (const doc of docs) {
    const exists = await Model.findOne({ [matchField]: doc[matchField] });
    if (!exists) {
      await Model.create(doc);
      created += 1;
    }
  }
  return created;
}

async function run() {
  await connectDB();

  const existingAdmin = await AdminUser.findOne({ username: adminUsername.toLowerCase() });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await AdminUser.create({ username: adminUsername.toLowerCase(), passwordHash });
    console.log(`[seed] Created admin user "${adminUsername}" (password from ADMIN_PASSWORD in .env)`);
  } else {
    console.log(`[seed] Admin user "${adminUsername}" already exists, skipping`);
  }

  const settingsExists = await SiteSettings.findOne();
  if (!settingsExists) {
    await SiteSettings.create({});
    console.log('[seed] Created default site settings');
  } else {
    console.log('[seed] Site settings already exist, skipping');
  }

  console.log(`[seed] Services created: ${await seedCollection(Service, services, 'slug')}`);
  console.log(`[seed] Works created: ${await seedCollection(Work, works, 'slug')}`);
  console.log(`[seed] Team members created: ${await seedCollection(TeamMember, team, 'name')}`);
  console.log(`[seed] Testimonials created: ${await seedCollection(Testimonial, testimonials, 'authorName')}`);
  console.log(`[seed] Success stories created: ${await seedCollection(SuccessStory, successStories, 'authorName')}`);
  console.log(`[seed] Pricing plans created: ${await seedCollection(PricingPlan, pricingPlans, 'name')}`);

  console.log('\n[seed] Done. You can now log into /admin with the ADMIN_USERNAME / ADMIN_PASSWORD from your .env file.');
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
