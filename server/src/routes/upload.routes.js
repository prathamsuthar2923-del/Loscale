const express = require('express');
const { requireAdmin } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');
const { uploadImage } = require('../controllers/upload.controller');

const router = express.Router();
router.post('/', requireAdmin, upload.single('image'), uploadImage);

module.exports = router;
