const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");

// .get() route ==> signup page
router.get("/dashboard", isLoggedIn, (req, res) => {
  const ErrorMessage = req.session.ErrorMessage;
  delete req.session.ErrorMessage;

  

  res.render("dashboard-admin", {
    style: "dashboard-admin.css",
    ErrorMessage: ErrorMessage,
  });
});

// .get() route ==> subject - static page
router.get("/subject", isLoggedIn, (req, res) => {
  res.render("subject-page", { style: "subject-page.css" });
});

module.exports = router;
