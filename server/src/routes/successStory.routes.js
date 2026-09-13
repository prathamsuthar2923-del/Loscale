const createCrudRoutes = require('../utils/crudRoutes');
const controller = require('../controllers/successStory.controller');

module.exports = createCrudRoutes(controller);
