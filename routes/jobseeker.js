const express = require("express");
const path = require("path");
const jobseekerController = require("../controller/jobseekerController");
const Jobseeker = require("../models/jobseeker");
const multer = require("multer");

const router = express.Router();

// Multer setup for file uploads
const upload = multer({
    storage: multer.diskStorage({}),
    limits: {fileSize: 2*1024*1024},
})
// GET route for admin to view data
router.get("/all", async (req, res) => {
  try {
    const jobSeekers = await Jobseeker.find();
    res.json(jobSeekers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Render pages
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// Save jobseeker with CV upload
router.post("/saveJobseeker", upload.single("cv"), (req, res) => {
  jobseekerController.saveJobseeker(req, res);
});
router.get('/contact',(req,res)=>{
    res.render('contact')
})

module.exports = router;
