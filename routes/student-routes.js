const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Router } = require("express");
const router = new Router();
const Student = require("../models/model.student");
const Parent = require("../models/model.parent");

//middleware
const isLoggedIn = require("../middleware/isLoggedIn");
const addStudent = require("../middleware/addStudent");
const { findByIdAndUpdate } = require("../models/model.student");

// .get() route ==> student
router.get("/student", isLoggedIn, async (req, res) => {
  const allStudents = await Student.find({});

  res.render("student-page", {
    style: "student-page.css",
    students: allStudents,
    user: req.session.passport.user.name,
  });
});

router.post("/registerStudent", addStudent, async (req, res) => {
  const allStudents = await Student.find({});

  res.render("student-page", {
    style: "student-page.css",
    students: allStudents,
  });
});

router.get("/student/:id/delete", isLoggedIn, (req, res) => {
  const { id } = req.params;

  Student.findByIdAndDelete(id).catch((error) => console.log(error));

  res.redirect("/student");
});

router.get("/student/:id/edit", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  try {
    const studentData = await await Student.findOne({ _id: id });
    const parentData = await Parent.findOne({ children: id });
    const allStudents = await Student.find({});

    res.render("student-edit-page", {
      style: "student-edit-page.css",
      title: "Edit-profiles",
      oneStudent: studentData,
      parent: parentData,
      students: allStudents,
      user: req.session.passport.user.name,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/student/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { gender, studentName, postcode, houseNo, parentName, email, contact } =
    req.body;

  try {
    const studentDB = await Student.findByIdAndUpdate(
      { _id: id },
      { name: studentName, gender }
    );

    const parentDB = await Parent.findOneAndUpdate(
      { children: id },
      {
        postcode: postcode,
        houseNo,
        name: parentName,
        contact,
        email,
      }
    );
  } catch (error) {
    console.log(error);
  }

  res.redirect("/student");
});

module.exports = router;
