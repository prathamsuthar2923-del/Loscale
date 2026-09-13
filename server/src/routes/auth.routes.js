const express = require('express');
const { requireAdmin } = require('../middleware/auth.middleware');
const { login, me } = require('../controllers/auth.controller');

const router = express.Router();
router.post('/login', login);
router.get('/me', requireAdmin, me);

module.exports = router;
