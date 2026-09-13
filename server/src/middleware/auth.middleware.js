const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.admin = payload; // { sub, username }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { requireAdmin };
