const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Pro"
    price: { type: String, required: true, trim: true }, // e.g. "$1,999" — kept as a string so it can hold "Custom", "$1,999", etc.
    billingNote: { type: String, default: 'billed monthly' }, // small line under the price, e.g. "/month billed monthly"
    note: { type: String, default: '' }, // one-line description under the plan name
    features: { type: [String], default: [] },
    highlighted: { type: Boolean, default: false }, // visually emphasized "Pro" style card
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PricingPlan', pricingPlanSchema);
