const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    authorName: { type: String, required: true, trim: true },
    authorTitle: { type: String, default: '' },
    photo: { type: String, default: '' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
