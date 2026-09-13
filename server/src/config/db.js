const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

async function connectDB() {
  if (!mongodbUri) {
    console.error(
      '\n[loscale-server] MONGODB_URI is not set. Copy server/.env.example to server/.env and fill in your connection string.\n'
    );
    process.exit(1);
  }
console.log(mongodbUri)
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(mongodbUri);
    console.log('[loscale-server] MongoDB connected');
  } catch (err) {
    console.error('[loscale-server] MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
