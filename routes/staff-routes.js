const mongoose = require("mongoose");
const { Router } = require("express");
const router = new Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Staff = require("../models/model.staff");

router.get("/approvals/:id/delete", isLoggedIn, (req, res) => {
  const { id } = req.params;

  Staff.findByIdAndDelete(id).catch((error) => console.log(error));

  res.redirect("/approvals");
});

router.get("/approvals/:id/edit", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  try {
    const userEdit = await Staff.findById(id);

    const staffData = await Staff.find();

    res.render("staff-edit-page", {
      style: "staff-edit-page.css",
      title: "Approvals",
      staff: staffData,
      userdata: userEdit,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/approvals/:id/edit", isLoggedIn, async (req, res) => {
  const { name, email, contact, role } = req.body;

  const { id } = req.params;

  try {
    const userEdit = await Staff.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        contact,
        role,
      }
    );

    const staffData = await Staff.find();

    res.redirect("/approvals");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
