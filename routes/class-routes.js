const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");

// .get() route ==> class
router.get("/class", isLoggedIn, (req, res) => {
  res.render("class-page", { style: "class-page.css" });
});

module.exports = router;
