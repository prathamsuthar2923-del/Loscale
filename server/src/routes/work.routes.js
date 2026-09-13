const createCrudRoutes = require('../utils/crudRoutes');
const controller = require('../controllers/work.controller');

const routes = createCrudRoutes(controller);

// Extra public route for the Work Detail page: GET /api/works/:slug
routes.public.get('/:slug', controller.getBySlug);

module.exports = routes;
