const express = require('express');
const { requireAdmin } = require('../middleware/auth.middleware');
const controller = require('../controllers/contact.controller');

const publicRouter = express.Router();
publicRouter.post('/', controller.create);

const adminRouter = express.Router();
adminRouter.use(requireAdmin);
adminRouter.get('/', controller.listAdmin);
adminRouter.patch('/:id/read', controller.toggleRead);
adminRouter.delete('/:id', controller.remove);

module.exports = { public: publicRouter, admin: adminRouter };
