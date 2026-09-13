require('dotenv').config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  return value;
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  mongodbUri: required('MONGODB_URI', ''),
  clientUrl: required('CLIENT_URL', 'http://localhost:5173'),
  jwtSecret: required('JWT_SECRET', 'dev-secret-change-me'),
  jwtExpiresIn: required('JWT_EXPIRES_IN', '7d'),
  adminUsername: required('ADMIN_USERNAME', 'admin'),
  adminPassword: required('ADMIN_PASSWORD', 'admin123'),
  email: {
    enabled: process.env.EMAIL_ENABLED === 'true',
    host: required('SMTP_HOST', ''),
    port: Number(process.env.SMTP_PORT) || 587,
    user: required('SMTP_USER', ''),
    pass: required('SMTP_PASS', ''),
    notifyTo: required('CONTACT_NOTIFICATION_EMAIL', 'grow@loscaledigital.com'),
  },
};
