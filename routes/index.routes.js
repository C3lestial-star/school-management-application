const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");

// .get() route ==> signup page
router.get("/dashboard", isLoggedIn, (req, res) => {
  res.render("dashboard-admin", { style: "dashboard-admin.css" });
});

// post route to logout and redirect to "/"
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// .get() route ==> signup page
router.get("/student", isLoggedIn, (req, res) => {
  res.render("student-page", { style: "student-page.css" });
});

// .get() route ==> signup page
router.get("/subject", isLoggedIn, (req, res) => {
  res.render("subject-page", { style: "subject-page.css" });
});

// .get() route ==> signup page
router.get("/class", isLoggedIn, (req, res) => {
  res.render("class-page", { style: "class-page.css" });
});

// .get() route ==> signup page
router.get("/teacher", isLoggedIn, (req, res) => {
  res.render("teacher-page", { style: "teacher-page.css" });
});

module.exports = router;
