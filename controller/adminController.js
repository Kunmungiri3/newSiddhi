const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const Jobseeker = require('../models/jobseeker');
const Vendor = require('../models/vendor');

// ========== Admin Login ==========
async function doLogin(req, res) {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.render("admin", {
        vendorCount: 0,
        jobseekerCount: 0,
        message: "Invalid Username or Password"
      });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.render("admin", {
        vendorCount: 0,
        jobseekerCount: 0,
        message: "Invalid Username or Password"
      });
    }

    // ✅ Get counts for dashboard
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    const jobseekers = await Jobseeker.find().sort({ createdAt: -1 });

    res.render("admin", {
      vendors,
      jobseekers,
      message: "Welcome Admin!"
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Something went wrong during login");
  }
}

// ========== Vendors ==========
async function listVendors(req, res) {
  try {
    const vendors = await Vendor.find({});
    const vendorCount = await Vendor.countDocuments({});
    res.render("listvendor", { vendors, vendorCount, message: null });
  } catch (err) {
    console.error("List vendors error:", err);
    res.status(500).send("Error fetching vendors");
  }
}

// ========== Jobseekers ==========
async function listJobseekers(req, res) {
  try {
    const jobseekers = await Jobseeker.find({});
    const jobseekerCount = await Jobseeker.countDocuments({});
    res.render("listjobseekers", { jobseekers, jobseekerCount, message: null });
  } catch (err) {
    console.error("List jobseekers error:", err);
    res.status(500).send("Error fetching jobseekers");
  }
}

// ========== Create Default Admin ==========
async function makeAdmin() {
  try {
    // ⚡️ DO NOT redeclare Admin and bcrypt here, use already imported ones
    const existingAdmin = await Admin.findOne({ username: "kunmungiri1@gmail.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("12345", 10); // default password
      await Admin.create({
        username: "admin",
        password: hashedPassword,
      });
      console.log("✅ Default admin created (username: admin, password: admin123)");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
}

module.exports = {
  doLogin,
  listVendors,
  listJobseekers,
  makeAdmin,   // ✅ properly exported
};
