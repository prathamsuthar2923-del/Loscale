const createCrudRoutes = require('../utils/crudRoutes');
const controller = require('../controllers/testimonial.controller');

module.exports = createCrudRoutes(controller);
