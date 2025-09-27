const Jobseeker = require("../models/jobseeker");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Save Jobseeker
async function saveJobseeker(req, res) {
  try {
    let cvUrl = null;
    console.log("Received file:", req.file);
    if (req.file) {
      // Upload CV to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "cv_uploads" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return res.status(500).send("Error uploading CV");
          }
          cvUrl = result.secure_url;
        }
      );
      
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      // Wait for upload to complete
      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });
    }

    console.log("CV URL:", cvUrl);
    const jobseeker = new Jobseeker({
      name: req.body.name,
      father: req.body.father,
      phone: req.body.phone,
      email: req.body.email,
      dob: req.body.dob,
      qualification: req.body.qualification,
      address: req.body.address,
      aadhar: req.body.aadhar,
      cv: cvUrl  // Cloudinary URL
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
