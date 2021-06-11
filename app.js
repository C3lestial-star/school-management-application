require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const passport = require("passport");
// require("./configs/passport")(passport);
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/staff");

//require session config
require("./configs/session")(app);

//require database config
require("./configs/db");

const MongoStore = require("connect-mongo");

// Router
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth-routes");

// Express View engine and views
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require passport config
require("./configs/passport");

app.use(passport.initialize());
app.use(passport.session());

//use passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        console.log(user);
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

//serialize and deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes middleware
app.use("/", indexRouter);
app.use("/", authRouter);

// this matches all routes and all methods - Error when route can't be found
app.use((req, res, next) => {
  res.status(404);
  res.render("not-found");
});

app.listen(process.env.PORT, (err) => {
  err
    ? console.log("Error in server setup")
    : console.log(`Listening on http://localhost:${process.env.PORT}`);
});

module.exports = app;
