const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const asyncHandler = require('../utils/asyncHandler');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  const user = await AdminUser.findOne({ username: username.trim().toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid username or password' });

  const token = jwt.sign({ sub: user._id, username: user.username }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  res.json({ token, username: user.username });
});

// GET /api/auth/me — protected, used to keep an existing session alive on reload
const me = asyncHandler(async (req, res) => {
  res.json({ username: req.admin.username });
});

module.exports = { login, me };
