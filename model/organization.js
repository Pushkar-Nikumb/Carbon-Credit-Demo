const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    sector: {
      type: String,
      required: true,
    },
    subSector: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    yearOfEstablishment: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      district: { type: String, required: true },
      pinCode: { type: String, required: true },
    },
    contact: {
      mobile: {
        type: String,
        required: true,
      },
    },
    registrationDetails: {
      PAN: {
        type: String,
        required: true,
      },
      TAN: {
        type: String,
        required: true,
      },
      GSTIN: {
        type: String,
        required: true,
      },
    },
    energyAuditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EnergyAuditor",
    },
    documentsUploaded: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentUploaded",
    },
    targets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Targets",
    },
    certificate:{
      type : mongoose.Schema.Types.ObjectId,
      ref:  "nftMinted"
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Organization", organizationSchema);
