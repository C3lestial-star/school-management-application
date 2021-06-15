const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");

// .get() route ==> teacher
router.get("/teacher", isLoggedIn, (req, res) => {
  res.render("teacher-page", { style: "teacher-page.css" });
});

module.exports = router;
