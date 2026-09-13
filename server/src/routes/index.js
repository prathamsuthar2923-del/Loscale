const express = require('express');

const services = require('./service.routes');
const works = require('./work.routes');
const team = require('./team.routes');
const testimonials = require('./testimonial.routes');
const successStories = require('./successStory.routes');
const contact = require('./contact.routes');
const settings = require('./settings.routes');
const authRoutes = require('./auth.routes');
const uploadRoutes = require('./upload.routes');

const router = express.Router();

// ---- Public API (consumed by the public website) ----
router.use('/services', services.public);
router.use('/works', works.public);
router.use('/team', team.public);
router.use('/testimonials', testimonials.public);
router.use('/success-stories', successStories.public);
router.use('/settings', settings.public);
router.use('/contact', contact.public);

// ---- Auth ----
router.use('/auth', authRoutes);

// ---- Admin API (all protected inside their own router via requireAdmin) ----
router.use('/admin/services', services.admin);
router.use('/admin/works', works.admin);
router.use('/admin/team', team.admin);
router.use('/admin/testimonials', testimonials.admin);
router.use('/admin/success-stories', successStories.admin);
router.use('/admin/settings', settings.admin);
router.use('/admin/contact', contact.admin);
router.use('/admin/upload', uploadRoutes);

module.exports = router;
