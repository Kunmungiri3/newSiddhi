const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  father: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date , required: true },
  qualification: { type: String , required: true },
  address: { type: String , required: true },
  aadhar: { type: String, required: true },
  cv: { type: String  } // CV file path
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Jobseeker || mongoose.model("Jobseeker", jobseekerSchema);
