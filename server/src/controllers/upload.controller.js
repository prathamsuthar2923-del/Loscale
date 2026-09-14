const asyncHandler = require('../utils/asyncHandler');

// POST /api/admin/upload — protected. Expects a single "image" file field.
// Returns a URL the client can store directly on a Work/TeamMember/etc.
const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
  res.json({ url: req.file.path }); // Cloudinary gives back a full, permanent URL
};

module.exports = { uploadImage };
