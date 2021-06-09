const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

function authenticate(pasport) {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, done) {
        console.log("we validating user");
        Admin.findOne({ email: email }, function (err, user) {
          if (err) {
            console.log("we got an error");
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          if (!bcrypt.compareSync(password, user.passwordHash)) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) => {
    Admin.findById({ _id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
}

module.exports = authenticate;
