const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
