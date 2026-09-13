const createCrudRoutes = require('../utils/crudRoutes');
const controller = require('../controllers/team.controller');

module.exports = createCrudRoutes(controller);
