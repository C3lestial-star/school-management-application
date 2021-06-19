const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Student = require("../models/model.student");
const Staff = require("../models/model.staff");
const { session } = require("passport");

// .get() route ==> signup page
router.get("/dashboard", isLoggedIn, async (req, res) => {
  const ErrorMessage = req.session.ErrorMessage;
  delete req.session.ErrorMessage;

  const studentsBoys = (await Student.find({ gender: "male" })).length;
  const studentsGirls = (await Student.find({ gender: "female" })).length;
  const numberOfStaff = (await Staff.find({})).length;
  const data = {
    staff: numberOfStaff,
    boys: studentsBoys,
    girls: studentsGirls,
    user: req.session.passport.user.name,
  };

  res.render("dashboard-admin", {
    style: "dashboard-admin.css",
    ErrorMessage: ErrorMessage,
    data,
  });
});

// .get() route ==> subject - static page
router.get("/subject", isLoggedIn, (req, res) => {
  res.render("subject-page", {
    style: "subject-page.css",
    user: req.session.passport.user.name,
  });
});

module.exports = router;
