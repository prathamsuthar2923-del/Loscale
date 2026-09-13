const ContactSubmission = require('../models/ContactSubmission');
const asyncHandler = require('../utils/asyncHandler');
const { sendContactNotification } = require('../utils/mailer');

// POST /api/contact — public. Used by the "Let's talk" / Contact Us form.
const create = asyncHandler(async (req, res) => {
  const { fullName, email, subject, description } = req.body;

  if (!fullName || !email || !description) {
    return res.status(400).json({ message: 'fullName, email and description are required' });
  }

  const submission = await ContactSubmission.create({ fullName, email, subject, description });

  const result = await sendContactNotification(submission);
  if (result.sent) {
    submission.emailSent = true;
    await submission.save();
  }

  res.status(201).json({
    message: "Thanks for reaching out — we'll be in touch soon.",
    submission,
  });
});

// GET /api/admin/contact — admin, newest first
const listAdmin = asyncHandler(async (req, res) => {
  const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
  res.json(submissions);
});

// PATCH /api/admin/contact/:id/read — toggle read/unread
const toggleRead = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ message: 'Not found' });
  submission.read = !submission.read;
  await submission.save();
  res.json(submission);
});

// DELETE /api/admin/contact/:id
const remove = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
  if (!submission) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

module.exports = { create, listAdmin, toggleRead, remove };
