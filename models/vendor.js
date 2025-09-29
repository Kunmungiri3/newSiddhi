const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  teamSize: { type: Number, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

// Prevent OverwriteModelError
module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
