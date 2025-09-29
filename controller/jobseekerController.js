const Jobseeker = require("../models/jobseeker");
const { uploadToCloudinary } = require("../utils/cloudinary");

// Save Jobseeker
async function saveJobseeker(req, res) {
  try {
    let cvPath = null;
    console.log("Received file:", req.file);
    if (req.file) {
      try {
        // Upload to Cloudinary
        cvPath = await uploadToCloudinary(req.file.buffer);
        console.log("CV URL from Cloudinary:", cvPath);
      } catch (uploadError) {
        console.error("❌ Cloudinary upload failed:", uploadError);
        cvPath = null; // Fallback to no CV if upload fails
      }
    }

    console.log("CV Path/URL:", cvPath);
    const jobseeker = new Jobseeker({
      name: req.body.name,
      father: req.body.father,
      phone: req.body.phone,
      email: req.body.email,
      dob: req.body.dob,
      qualification: req.body.qualification,
      address: req.body.address,
      aadhar: req.body.aadhar,
      cv: cvPath  // Cloudinary URL or null
    });

    await jobseeker.save();
    console.log("✅ Jobseeker saved:", jobseeker);

    // 👉 Pass the jobseeker object to the success page
    res.render("done", { jobseeker });
  } catch (err) {
    console.error("❌ Error saving jobseeker:", err);
    res.status(500).send("Error saving jobseeker");
  }
}

// List Jobseekers
async function listJobseekers(req, res) {
  try {
    const jobseekers = await Jobseeker.find().sort({ createdAt: -1 });
    res.render("listjobseekers", { jobseekers });
  } catch (err) {
    console.error("❌ Error fetching jobseekers:", err);
    res.status(500).send("Error fetching jobseekers");
  }
}

module.exports = { saveJobseeker, listJobseekers };
