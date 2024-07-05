const router = require("express").Router();
const Organization = require("../model/organization");
const EnergyAuditor = require("../model/auditor");
const newAuditorData = async (body, req, res) => {
  const newAuditor = new EnergyAuditor({
    registrationNumber: body.registrationNumber,
    name: body.name,
    phone: body.phone,
    mobile: body.mobile,
    email: body.email,
  });
  try {
    const saveAuditor = await newAuditor.save();
    console.log(saveAuditor);

    console.log("Auditor Added successfully:", saveAuditor);
    res.status(200).send({ success: true, message: saveAuditor });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

router.post("/add_auditor", async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res
      .status(500)
      .send({ success: false, message: "Data not received from CLient!" });
  }
  try {
    const auditExists = await EnergyAuditor.findOne({
      registrationNumber: req.body.registrationNumber,
    });
    if (!auditExists) {
      //   console.log("Organization ID Exists : ", userExists._id);
      newAuditorData(req.body, req, res);
    } else {
      console.log("User does Exist!, check for his/her userID correctly!");
      return res.status(500).send({ success: false, message: `User with Registration ID ${req.body.registrationNumber} already Exists, Give new Registration Number ` });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
});
module.exports = router;
