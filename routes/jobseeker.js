const express = require("express");
const path = require("path");
const jobseekerController = require("../controller/jobseekerController");
const Jobseeker = require("../models/jobseeker");
const multer = require("multer");
const xlsx = require("xlsx");

const router = express.Router();

// ✅ Multer setup for CV uploads to memory (for Cloudinary)
const storage = multer.memoryStorage(); // Store in buffer for Cloudinary upload
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max
});

// ================= Routes =================

// GET all jobseekers (for admin, raw JSON)
router.get("/all", async (req, res) => {
  try {
    const jobSeekers = await Jobseeker.find();
    res.json(jobSeekers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Render Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Render Login Page (if needed)
router.get("/login", (req, res) => {
  res.render("login");
});

// ✅ Save Jobseeker (with CV upload)
router.post("/saveJobseeker", upload.single("cv"), jobseekerController.saveJobseeker);

// ✅ List Jobseekers (admin dashboard)
router.get("/jobseekers", jobseekerController.listJobseekers);

// Export Jobseekers to Excel
router.get("/export", async (req, res) => {
  try {
    const jobseekers = await Jobseeker.find().lean();
    const worksheet = xlsx.utils.json_to_sheet(jobseekers);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Jobseekers");
    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
    res.setHeader("Content-Disposition", "attachment; filename=jobseekers.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Error exporting jobseekers to Excel");
  }
});

module.exports = router;
