const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();

// ========== Admin Login ==========
router.post("/welcome/admin", adminController.doLogin);

// ========== Vendors ==========
router.get("/listvendors", adminController.listVendors);

// ========== Jobseekers ==========
router.get("/listjobseekers", adminController.listJobseekers);

// ========== Logout (optional) ==========
router.get("/logout", (req, res) => {
  // If using sessions:
  // req.session.destroy(() => {
  //   res.redirect("/");
  // });
  
  // For now, just redirect to login page
  res.redirect("/");
});

module.exports = router;
