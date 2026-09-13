const PricingPlan = require('../models/PricingPlan');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(PricingPlan);
