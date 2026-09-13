const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
  {
    value: { type: String, required: true }, // e.g. "+28%"
    label: { type: String, required: true }, // e.g. "Customer retention"
  },
  { _id: false }
);

const successStorySchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    authorName: { type: String, required: true, trim: true },
    authorTitle: { type: String, default: '' },
    image: { type: String, default: '' },
    hasVideo: { type: Boolean, default: false },
    stats: { type: [statSchema], default: [] },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SuccessStory', successStorySchema);
