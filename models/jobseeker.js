const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  father: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  dob: { type: Date },
  qualification: { type: String },
  address: { type: String },
  aadhar: { type: String },
  cv: { type: String } // CV file path
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Jobseeker || mongoose.model("Jobseeker", jobseekerSchema);
