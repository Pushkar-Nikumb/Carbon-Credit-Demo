const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    auth_time: {
      type: String,
      required: true,
    },
    metamask:{
      type: String,
      required:true
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users',userSchema)