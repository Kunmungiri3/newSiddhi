const express = require("express");
const path = require("path");
const jobseekerController = require("../controller/jobseekerController");
const Jobseeker = require("../models/jobseeker");
const multer = require("multer");
const xlsx = require("xlsx");

const router = express.Router();

// Multer setup for CV uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max
});

// ================= Routes =================

// GET all jobseekers (JSON)
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

// Render Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Save Jobseeker (with CV upload)
router.post("/saveJobseeker", upload.single("cv"), jobseekerController.saveJobseeker);

// List Jobseekers (admin dashboard)
router.get("/jobseekers", jobseekerController.listJobseekers);

// ================= Edit Jobseeker =================

// Render Edit Page
router.get("/edit/:id", async (req, res) => {
  try {
    const jobseeker = await Jobseeker.findById(req.params.id);
    if (!jobseeker) return res.status(404).send("Jobseeker not found");
    res.render("edit-jobseeker", { jobseeker });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Jobseeker
// ================= Update Jobseeker =================
router.post("/edit/:id", upload.single("cv"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      // Example: Save locally in /uploads folder
      const fs = require('fs');
      const uploadPath = path.join(__dirname, '../public/uploads', req.file.originalname);
      fs.writeFileSync(uploadPath, req.file.buffer);
      updateData.cv = '/uploads/' + req.file.originalname;
    }

    const updated = await Jobseeker.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, jobseeker: updated }); // <-- return JSON for AJAX
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});


// ================= Delete Jobseeker =================
router.post("/delete/:id", async (req, res) => {
  try {
    await Jobseeker.findByIdAndDelete(req.params.id);
    res.redirect("/admin/jobseekers");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
