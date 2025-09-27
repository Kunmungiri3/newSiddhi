const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const Jobseeker = require('../models/jobseeker');
const Vendor = require('../models/vendor');

// ========== Admin Login ==========
async function doLogin(req, res) {
  console.log("POST /admin/login hit - attempting login for username:", req.body.username); // Debug log
  try {
    const { username, password } = req.body;
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
    // ✅ On successful login → render dashboard with menu
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
    // Delete existing admin to recreate with new credentials
    await Admin.deleteMany({});
    
    const hashedPassword = await bcrypt.hash("12345", 10); // default password
    await Admin.create({
      username: "kunmungiri1@gmail.com",
      password: hashedPassword,
    });
    console.log("✅ Default admin created: ");
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
}

module.exports = {
  doLogin,
  listVendors,
  listJobseekers,
  makeAdmin,
};
