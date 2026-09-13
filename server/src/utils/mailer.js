const { email } = require('../config/env');

// Email sending is intentionally disabled until you provide SMTP credentials
// (see server/.env.example). Every contact submission is ALWAYS saved to the
// database regardless of this setting — this only controls whether a
// notification email also goes out.
//
// To enable later:
//   1. `npm install nodemailer` in /server
//   2. uncomment the nodemailer block below
//   3. set EMAIL_ENABLED=true and the SMTP_* vars in server/.env
async function sendContactNotification(submission) {
  if (!email.enabled) {
    console.log(
      `[mailer] Email sending is disabled (EMAIL_ENABLED=false). New contact submission from ${submission.email} was saved but no email was sent.`
    );
    return { sent: false, reason: 'disabled' };
  }

  if (!email.host || !email.user || !email.pass) {
    console.warn('[mailer] EMAIL_ENABLED=true but SMTP_HOST/SMTP_USER/SMTP_PASS are missing. Skipping send.');
    return { sent: false, reason: 'missing-config' };
  }

  /*
  // Uncomment once `nodemailer` is installed and SMTP_* env vars are filled in.
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: email.port === 465,
    auth: { user: email.user, pass: email.pass },
  });

  await transporter.sendMail({
    from: `"Loscale Website" <${email.user}>`,
    to: email.notifyTo,
    replyTo: submission.email,
    subject: `New contact form submission: ${submission.subject || 'No subject'}`,
    text: [
      `Name: ${submission.fullName}`,
      `Email: ${submission.email}`,
      `Subject: ${submission.subject || '(none)'}`,
      '',
      submission.description,
    ].join('\n'),
  });

  return { sent: true };
  */

  return { sent: false, reason: 'not-implemented' };
}

module.exports = { sendContactNotification };
