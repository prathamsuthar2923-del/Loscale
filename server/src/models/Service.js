const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // full title, shown on the Services page
    homepageTitle: { type: String, trim: true, default: '' }, // short title for the homepage scroll teaser — falls back to `title` when blank
    tag: { type: String, trim: true, default: '' }, // small label, e.g. "PAID ADS"
    description: { type: String, default: '' },
    image: { type: String, default: '' }, // optional — shown in the homepage scroll teaser
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }, // Active / Inactive on the live site
    showOnHomepage: { type: Boolean, default: true }, // also featured in the homepage scroll teaser
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
