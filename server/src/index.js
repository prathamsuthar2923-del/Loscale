const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { port, clientUrl } = require('./config/env');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

async function start() {
  await connectDB();

  const app = express();

  app.use(cors({ origin: clientUrl, credentials: true }));
  app.use(express.json({ limit: '5mb' }));
  app.use(morgan('dev'));

  // Uploaded images (work galleries, team photos, etc.)
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`[loscale-server] listening on http://localhost:${port}`);
  });
}

start();
