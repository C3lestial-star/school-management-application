const mongoose = require("mongoose");
const { Router } = require("express");
const validation = require("../middleware/authentication");
const router = new Router();
const express = require("express");
const passport = require("passport");
require("./index.routes");
require("../configs/passport");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//require models
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Admin = require("../models/admin");
const Parent = require("../models/parent");

// .get() route ==> home page before you login
router.get("/", (req, res) => {
  res.render("auth/login", { style: "login", title: "Login" });
});

// .post() route ==> home page before you login
// router.post("/", passport.authenticate('local'), (req, res) => {
//   res.render("auth/login", { style: "login.css", title: "Login" });
// });
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

// .get() route ==> signup page
router.get("/signup", (req, res) => {
  res.render("auth/signup", { style: "signup", title: "Sign up" });
});

// .post() route ==> signup page
router.post("/signup", validation, (req, res, next) => {
  const { repeatpassword, password, name, email, contact, role } = req.body;

  // Encrypt the password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (role === "teacher") {
    // Save the user in DB

    const newTeacher = new Teacher({
      name,
      email,
      contact,
      role,
      passwordHash: hashPass,
    });

    newTeacher
      .save()
      .then((userDB) => {
        return res.render("dashboard-admin", {
          style: "dashboard-admin",
          title: "dashboard",
        });
      })
      .catch((err) => next(err));
  } else if (role === "admin") {
    // Save the user in DB

    const newAdmin = new Admin({
      name,
      email,
      contact,
      role,
      passwordHash: hashPass,
    });

    newAdmin
      .save()
      .then((userDB) => {
        req.session.currentUser = userDB;
        console.log(req.session);
        return res.render("dashboard-admin", {
          style: "dashboard-admin",
          title: "dashboard",
        });
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
