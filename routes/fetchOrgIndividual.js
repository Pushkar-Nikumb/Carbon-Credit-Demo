const router = require("express").Router();

const Organization = require("../model/organization");
const EnergyAuditor = require("../model/auditor");
const DocumentUploaded = require('../model/documents')
const Targets = require('../model/targets')

router.post("/fetchIndividualOrgData", async (req, res) => {
    if(!req.body){
        res.status(500).send({success : false,message : "Data not received from CLient!"})
    }
  try {
    const response = await Organization.findById(req.body.organizationalID); // Use exec() to execute the query
    console.log(response.energyAuditor);
    const energyAuditorData = await EnergyAuditor.findById(response.energyAuditor)
    const DocumentUploadedData = await DocumentUploaded.findById(response.documentsUploaded)
    const TargetData = await Targets.findById(response.targets)

    res.status(200).send({success : true,message : response, Auditor : energyAuditorData, documents : DocumentUploadedData, targets : TargetData})
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
