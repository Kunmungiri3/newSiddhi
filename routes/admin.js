const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();

console.log("Admin routes loaded: POST /login, GET /vendors, GET /jobseekers"); // Debug log for route loading

// ========== Admin Login ==========
router.post("/login", adminController.doLogin);

// ========== Vendors ==========
router.get("/vendors", adminController.listVendors);
router.get("/vendors/:id/edit", adminController.editVendor);
router.post("/vendors/:id/edit", adminController.updateVendor);
router.post("/vendors/:id/delete", adminController.deleteVendor);

// ========== Jobseekers ==========
router.get("/jobseekers", adminController.listJobseekers);

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
