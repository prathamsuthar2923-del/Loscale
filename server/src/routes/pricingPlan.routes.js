const createCrudRoutes = require('../utils/crudRoutes');
const controller = require('../controllers/pricingPlan.controller');

module.exports = createCrudRoutes(controller);
