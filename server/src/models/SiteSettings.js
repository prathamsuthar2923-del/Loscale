const mongoose = require('mongoose');

// There is exactly one SiteSettings document (a singleton). It holds the
// on/off switch for every homepage section plus footer social links, so the
// admin panel can toggle things on and off without touching code.
const siteSettingsSchema = new mongoose.Schema(
  {
    sections: {
      hero: { type: Boolean, default: true },
      whoWeAre: { type: Boolean, default: true },
      stats: { type: Boolean, default: true },
      works: { type: Boolean, default: true },
      goalsRow: { type: Boolean, default: true },
      services: { type: Boolean, default: true },
      team: { type: Boolean, default: true },
      pricing: { type: Boolean, default: true },
      testimonials: { type: Boolean, default: true },
      successStories: { type: Boolean, default: true },
      latestInsights: { type: Boolean, default: false }, // commented out per request
      ctaBand: { type: Boolean, default: true },
    },
    social: {
      youtube: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    contactEmail: { type: String, default: 'grow@loscaledigital.com' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
