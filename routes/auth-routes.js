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
const Student = require("../models/student");
const Staff = require("../models/staff");
const Parent = require("../models/parent");

// .get() route ==> home page before you login
router.get(["/", "/login"], (req, res) => {
  Staff.findOne({ email: "mohamud.issa@ymail.com" }).then((user) =>
    console.log(user)
  );
  res.render("auth/login", { style: "login.css", title: "Login" });
});

// Login Logic
// middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup",
  }),
  function (req, res) {
    console.log("login triggered");
  }
);

// .get() route ==> signup page
router.get("/signup", (req, res) => {
  res.render("auth/signup", { style: "signup.css", title: "Sign up" });
});

// .post() route ==> signup page
router.post("/signup", validation, (req, res, next) => {
  const { repeatpassword, password, name, email, contact, role } = req.body;

  // Encrypt the password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  // Save the user in DB
  const newStaff = new Staff({
    name,
    email,
    contact,
    role,
    passwordHash: hashPass,
  });

  newStaff
    .save()
    .then((userDB) => {
      return res.render("dashboard-admin", {
        style: "dashboard-admin.css",
        title: "dashboard",
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
