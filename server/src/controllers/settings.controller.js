const SiteSettings = require('../models/SiteSettings');
const asyncHandler = require('../utils/asyncHandler');

// Ensures the singleton settings document exists, creating a default one on
// first run so the app never has to special-case "no settings yet".
async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

// GET /api/settings — public
const getPublic = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.json(settings);
});

// GET /api/admin/settings — admin (same data, kept as a separate route so
// the client can call one consistent /admin/* base for everything it edits)
const getAdmin = getPublic;

// PUT /api/admin/settings
const update = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  const { sections, social, contactEmail } = req.body;

  if (sections) Object.assign(settings.sections, sections);
  if (social) Object.assign(settings.social, social);
  if (typeof contactEmail === 'string') settings.contactEmail = contactEmail;

  await settings.save();
  res.json(settings);
});

module.exports = { getPublic, getAdmin, update };
