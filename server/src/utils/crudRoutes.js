const express = require('express');
const { requireAdmin } = require('../middleware/auth.middleware');

/**
 * Wires up the standard public + admin routes for a resource controller
 * built with crudFactory. Mount the returned router twice in routes/index.js:
 *   app.use('/api/<resource>', router.public)
 *   app.use('/api/admin/<resource>', router.admin)
 */
function createCrudRoutes(controller) {
  const publicRouter = express.Router();
  publicRouter.get('/', controller.listPublic);

  const adminRouter = express.Router();
  adminRouter.use(requireAdmin);
  adminRouter.get('/', controller.listAdmin);
  adminRouter.get('/:id', controller.getOne);
  adminRouter.post('/', controller.create);
  adminRouter.put('/:id', controller.update);
  adminRouter.patch('/:id/toggle', controller.toggleVisible);
  if (controller.toggleHomepage) {
    adminRouter.patch('/:id/toggle-homepage', controller.toggleHomepage);
  }
  adminRouter.delete('/:id', controller.remove);

  return { public: publicRouter, admin: adminRouter };
}

module.exports = createCrudRoutes;
