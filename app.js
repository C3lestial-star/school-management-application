require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/model.staff");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

//require session config
require("./configs/session")(app);

//require database config
require("./configs/db");

const MongoStore = require("connect-mongo");

// Router
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth-routes");
const teacherRouter = require("./routes/staff-routes");
const studentRouter = require("./routes/student-routes");
const classRouter = require("./routes/class-routes");

// Express View engine and views
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
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
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!bcrypt.compareSync(password, user.passwordHash)) {
          return done(null, false, { message: "Incorrect password." });
        }
        done(null, user);
      }).catch((err) => done(err));
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

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: "flashMessage", useCookieSession: true }));

// Routes middleware
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", teacherRouter);
app.use("/", studentRouter);
app.use("/", classRouter);

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
