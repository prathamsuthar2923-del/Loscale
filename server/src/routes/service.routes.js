const createCrudRoutes = require('../utils/crudRoutes');
const controller = require('../controllers/service.controller');

module.exports = createCrudRoutes(controller);
