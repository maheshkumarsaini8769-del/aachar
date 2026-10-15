const connectDB = require('../backend/src/config/db');
const { app } = require('../backend/src/server');

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
