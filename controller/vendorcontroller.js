const Vendor = require("../models/vendor");

// Save Vendor
async function saveVendor(req, res) {
  try {
    const vendor = new Vendor({
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson, // ✅ required field
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      services: req.body.message ? [req.body.message] : [],
    });

    await vendor.save();
    console.log("✅ Vendor saved successfully...");
    res.redirect("/vendor/list");
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

module.exports = { 
  saveVendor,
  listVendors
};
