const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    client: { type: String, default: '' },
    category: { type: String, default: '' }, // e.g. "3D COMMERCIAL"
    year: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }, // Active / Inactive on the live site
    showOnHomepage: { type: Boolean, default: true }, // also featured in the homepage works preview
  },
  { timestamps: true }
);

module.exports = mongoose.model('Work', workSchema);
