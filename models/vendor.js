const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  contactPerson: { type: String, required: true }, // required field
  email: { type: String },
  companyName: { type: String },
  phone: { type: String },
  address: { type: String },
  message: [{ type: String }], // array of messages
}, { timestamps: true });

// Prevent OverwriteModelError
module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
