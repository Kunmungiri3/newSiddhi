const Vendor = require("../models/vendor");

// Save Vendor
async function saveVendor(req, res) {
  try {
    const vendor = new Vendor({
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      teamSize: req.body.teamSize,
      message: req.body.message,
    });

    await vendor.save();
    console.log("✅ Vendor saved successfully...");

    // Render the success page instead of redirect
    res.render("vendorSuccess", { vendor });

  } catch (err) {
    console.error("❌ Error saving vendor:", err);
    res.status(500).send("Error saving vendor");
  }
}

// List Vendors
async function listVendors(req, res) {
  try {
    let query = {};
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      query = {
        $or: [
          { companyName: searchRegex },
          { contactPerson: searchRegex }
        ]
      };
    }
    const vendors = await Vendor.find(query).sort({ createdAt: -1 });
    res.render("listvendor", { vendors, search: req.query.search || '' });
  } catch (err) {
    console.error("❌ Error fetching vendors:", err);
    res.status(500).send("Error fetching vendors");
  }
}

async function editVendor(req, res) {
  try {
    const vendor = await require("../models/vendor").findById(req.params.id);
    if (!vendor) return res.status(404).send("Vendor not found");
    res.render("edit-vendor", { vendor });
  } catch (err) {
    console.error("❌ Error fetching vendor:", err);
    res.status(500).send("Error fetching vendor");
  }
}

async function updateVendor(req, res) {
  try {
    const updateData = { ...req.body };
    const updated = await require("../models/vendor").findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.redirect("/admin/vendors");
  } catch (err) {
    console.error("❌ Error updating vendor:", err);
    res.status(500).send("Error updating vendor");
  }
}

async function deleteVendor(req, res) {
  try {
    await require("../models/vendor").findByIdAndDelete(req.params.id);
    res.redirect("/admin/vendors");
  } catch (err) {
    console.error("❌ Error deleting vendor:", err);
    res.status(500).send("Error deleting vendor");
  }
}

module.exports = { 
  saveVendor,
  listVendors,
  editVendor,
  updateVendor,
  deleteVendor
};
