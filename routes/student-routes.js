const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const Student = require("../models/model.student");

//middleware
const isLoggedIn = require("../middleware/isLoggedIn");
const addStudent = require("../middleware/addStudent");

// .get() route ==> student
router.get("/student", isLoggedIn, async (req, res) => {
  const allStudents = await Student.find({});

  res.render("student-page", {
    style: "student-page.css",
    students: allStudents,
  });
});

router.post("/registerStudent", addStudent, async (req, res) => {
  const allStudents = await Student.find({});

  res.render("student-page", {
    style: "student-page.css",
    students: allStudents,
  });
});

module.exports = router;
