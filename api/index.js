const connectDB = require('../backend/src/config/db');
const { app } = require('../backend/src/server');

module.exports = async (req, res) => {
  try {
    await Promise.race([
      connectDB(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB connection timeout')), 1500))
    ]);
  } catch (err) {
    // Graceful fallback in cloud preview when MongoDB Atlas is not yet configured
  }
  return app(req, res);
};
