const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const Jobseeker = require('../models/jobseeker');
const Vendor = require('../models/vendor');
const { ObjectId } = require('mongoose').Types;

// ========== Admin Login ==========
async function doLogin(req, res) {
  console.log("POST /admin/login hit - attempting login for username:", req.body.username);

  try {
    let { username, password } = req.body;

    // normalize input
    username = username.trim().toLowerCase();

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log("Invalid username");
      return res.render("login", { message: "Invalid Username or Password" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      console.log("Invalid password");
      return res.render("login", { message: "Invalid Username or Password" });
    }

    console.log("Login successful");
    res.render("admin", { message: "Welcome Admin!" });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Something went wrong during login");
  }
}

// ========== Vendors ==========
async function listVendors(req, res) {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    const vendorCount = await Vendor.countDocuments();
    res.render("listvendor", { vendors, vendorCount, message: null });
  } catch (err) {
    console.error("List vendors error:", err);
    res.status(500).send("Error fetching vendors");
  }
}

// ========== Vendors ==========
async function editVendor(req, res) {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).send("Vendor not found");
    res.render("edit-listvendor", { vendor });
  } catch (err) {
    console.error("❌ Error fetching vendor:", err);
    res.status(500).send("Error fetching vendor");
  }
}

async function updateVendor(req, res) {
  try {
    const updateData = { ...req.body };
    const updated = await Vendor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).send("Vendor not found");
    res.redirect("/admin/vendors");
  } catch (err) {
    console.error("❌ Error updating vendor:", err);
    res.status(500).send("Error updating vendor");
  }
}

async function deleteVendor(req, res) {
  try {
    console.log("Attempting to delete vendor with id:", req.params.id);
    const deleted = await Vendor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log("Vendor not found for id:", req.params.id);
      return res.status(404).send("Vendor not found");
    }
    console.log("Vendor deleted successfully:", req.params.id);
    res.redirect("/admin/vendors");
  } catch (err) {
    console.error("❌ Error deleting vendor:", err.stack);
    res.status(500).send("Error deleting vendor");
  }
}

// ========== Jobseekers ==========
async function listJobseekers(req, res) {
  try {
    const jobseekers = await Jobseeker.find().sort({ createdAt: -1 });
    const jobseekerCount = await Jobseeker.countDocuments();
    res.render("listjobseekers", { jobseekers, jobseekerCount, message: null });
  } catch (err) {
    console.error("List jobseekers error:", err);
    res.status(500).send("Error fetching jobseekers");
  }
}

// ========== Create Default Admin ==========
async function makeAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ username: "kunmungiri1@gmail.com" });

    if (existingAdmin) {
      console.log("ℹ️ Admin already exists:", existingAdmin.username);
      return;
    }

    const hashedPassword = await bcrypt.hash("12345", 10);
    await Admin.create({
      username: "kunmungiri1@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ Default admin created: kunmungiri1@gmail.com (password: 12345)");
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
}

module.exports = {
  doLogin,
  listVendors,
  editVendor,
  updateVendor,
  deleteVendor,
  listJobseekers,
  makeAdmin,
};
