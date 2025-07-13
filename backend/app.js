require('dotenv').config(); // Load .env variables

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const likesRouter = require('./routes/likes');

const app = express();

// ✅ Environment variables
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI not defined in .env');
  process.exit(1);
}

// ✅ Mongoose connection using Atlas URI
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// 🔐 Passport config
app.use(passport.initialize());
require('./passport-config')(passport);

// 📦 Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🧱 Serve frontend in production
const env = process.env.NODE_ENV || 'dev';
if (env === 'production') {
  app.use("/", express.static(path.join(path.dirname(__dirname), '/frontend/build')));
}

// ✅ API Health check
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'API is running 🚀' });
});

// 🛣 Routes
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.use('/api', likesRouter);

// ❌ 404 handler
app.use(function (req, res, next) {
  next(createError(404, 'Not Found'));
});

// 🛠 Global error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

module.exports = app;
