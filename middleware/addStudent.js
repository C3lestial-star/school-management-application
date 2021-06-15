const Student = require("../models/model.student");
const Parent = require("../models/model.parent");

module.exports = (req, res, next) => {
  const { studentName, dob, postcode, houseNo, parentName, email, contact } =
    req.body;

  Parent.findOne({ postcode: postcode, houseNo }).then((userDB) => {
    if (!userDB) {
      const newParent = new Parent({
        name: parentName,
        postcode,
        houseNo,
        email,
        contact,
      });

      //Save new parent in DB
      newParent
        .save()
        .then((ParentDB) => {
          const newStudent = new Student({
            name: studentName,
            dob,
            parent: ParentDB,
          });

          newStudent
            .save()
            .then((StudentDB) => {
              Parent.findOneAndUpdate(
                userDB,
                { $push: { children: StudentDB } },
                function (error, success) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(success);
                  }
                }
              );
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  });
};
