const mongoose = require("mongoose");
const { Router } = require("express");
const authentication = require("../middleware/authentication");
const CheckAdminStatus = require("../middleware/admin-auth");
const router = new Router();
const express = require("express");
const passport = require("passport");
require("./index.routes");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//require models
const Student = require("../models/model.student");
const Staff = require("../models/model.staff");
const Parent = require("../models/model.parent");

// .get() route ==> home page before you login
router.get(["/", "/login"], (req, res) => {
  res.render("auth/login", { style: "login-page.css", title: "Login" });
});

// Login Logic
// middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// .get() route ==> signup page
router.get("/signup", (req, res) => {
  res.render("auth/signup", { style: "signup-page.css", title: "Sign up" });
});

// .post() route ==> signup page
router.post("/signup", authentication, (req, res, next) => {
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
      return res.render("auth/login", {
        style: "login-page.css",
        title: "login",
      });
    })
    .catch((err) => next(err));
});

// post route to logout and redirect to "/"
router.post("/logout", (req, res) => {
  console.log(req.session.passport);
  req.session.destroy();
  res.redirect("/");
});

router.get("/approvals", CheckAdminStatus, async (req, res) => {
  const staffData = await Staff.find();

  res.render("approvals-page", {
    style: "approvals-page.css",
    title: "Approvals",
    staff: staffData,
  });
});

module.exports = router;
