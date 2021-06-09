const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();

// .get() route ==> signup page
router.get("/dashboard", (req, res) => {
  console.log("hallo");
  res.render("dashboard-admin", {
    style: "dashboard-admin",
    title: "dashboard",
  });
});

module.exports = router;
