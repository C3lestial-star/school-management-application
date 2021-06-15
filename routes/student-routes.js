const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const addStudent = require("../middleware/addStudent");

// .get() route ==> student
router.get("/student", isLoggedIn, (req, res) => {
  res.render("student-page", { style: "student-page.css" });
});

router.post("/registerStudent", addStudent, (req, res) => {
  
});

module.exports = router;

