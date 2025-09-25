const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  contactPerson: { type: String, required: true }, // ✅ instead of "name"
  email: { type: String },
  companyName: { type: String },
  phone: { type: String },
  address: { type: String },
  services: [{ type: String }],
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
