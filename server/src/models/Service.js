const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tag: { type: String, trim: true, default: '' }, // small label, e.g. "PAID ADS"
    description: { type: String, default: '' },
    image: { type: String, default: '' }, // optional — shown in the homepage scroll teaser
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
