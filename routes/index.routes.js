const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();

// .get() route ==> signup page
router.get("/dashboard", (req, res) => {
  res.render("dashboard-admin", { style: "dashboard-admin.css" });
});

module.exports = router;
