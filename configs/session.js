const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      name: "sid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(process.env.SESS_LIFETIME),
        sameSite: false,
        httpOnly: true,
      },
      rolling: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
      }),
    })
  );
};
