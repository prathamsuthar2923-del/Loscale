const express = require('express');
const { requireAdmin } = require('../middleware/auth.middleware');
const controller = require('../controllers/settings.controller');

const publicRouter = express.Router();
publicRouter.get('/', controller.getPublic);

const adminRouter = express.Router();
adminRouter.use(requireAdmin);
adminRouter.get('/', controller.getAdmin);
adminRouter.put('/', controller.update);

module.exports = { public: publicRouter, admin: adminRouter };
