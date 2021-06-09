const dotenv = require("dotenv");

// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
  sessionLifeTime: process.env.SESS_LIFETIME,
};
