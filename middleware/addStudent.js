const Student = require("../models/model.student");
const Parent = require("../models/model.parent");

module.exports = async (req, res, next) => {
  try {
    const {
      gender,
      studentName,
      dob,
      postcode,
      houseNo,
      parentName,
      email,
      contact,
    } = req.body;

    let parentMongo = await Parent.findOne({ postcode: postcode, houseNo });

    if (!parentMongo) {
      parentMongo = new Parent({
        name: parentName,
        postcode,
        houseNo,
        email,
        contact,
      });

      await parentMongo.save();
    }

    const newStudent = new Student({
      name: studentName,
      dob,
      parent: parentMongo,
      gender,
    });

    await newStudent.save();

    await parentMongo.update(
      { $push: { children: newStudent } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

  next();
};
