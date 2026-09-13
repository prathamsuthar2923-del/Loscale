const asyncHandler = require('../utils/asyncHandler');

// POST /api/admin/upload — protected. Expects a single "image" file field.
// Returns a URL the client can store directly on a Work/TeamMember/etc.
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded (expected field name "image")' });
  }
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

module.exports = { uploadImage };
