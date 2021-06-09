const Teacher = require("../models/teacher");
const Admin = require("../models/admin");

module.exports = (req, res, next) => {
  const { repeatpassword, password, name, email, contact, role } = req.body;
  // 1. Check username and password are not empty
  if (!email || !password) {
    res.render("auth/signup", {
      errorMessage: "Please fill in required fields",
      style: "signup.css",
      title: "Sign up",
    });
    return;
  }

  if (repeatpassword !== password) {
    res.render("auth/signup", {
      errorMessage: "Passwords do not match",
      style: "signup.css",
      title: "Sign up",
    });
    return;
  }

  if (role === "teacher") {
    Teacher.findOne({ email })
      .then((user) => {
        // 2. Check user does not already exist
        if (user !== null) {
          res.render("auth/login", {
            message: "Email already exists",
            style: "signup.css",
          });
          return;
        }
      })
      .catch((err) => next(err));
  } else if (role === "admin") {
    Admin.findOne({ email }).then((user) => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render("auth/signup", {
          message: "Email already exists",
          style: "signup.css",
        });
        return;
      }
    });
  }
  next();
};
