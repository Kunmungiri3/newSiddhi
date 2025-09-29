require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Controllers
const adminController = require("./controller/adminController");

// Routes
const jobSeekerRoutes = require("./routes/jobseeker");
const vendorRoutes = require("./routes/vendor");
const adminRoutes = require("./routes/admin"); // ✅ admin routes file

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form submissions
// Serve uploaded CVs from public/uploads (legacy; new CVs use Cloudinary URLs)
// app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use("/css", express.static("css"));          // serve static css
app.use(express.static("public"));               // serve public files

// ===== View Engine =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== Root Page =====
app.get("/", (req, res) => {
  res.render("index");
});

// ===== Admin Login Page =====
app.get("/admin", (req, res) => {
  res.render("login"); // show login form (login.ejs)
});

// ===== Redirects for user-friendly URLs =====
app.get("/register", (req, res) => res.redirect("/api/jobseekers/register"));
app.get("/vendor-registration", (req, res) => res.redirect("/api/vendors/vendor-registration"));

// ===== Routes =====
app.use("/api/jobseekers", jobSeekerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/admin", adminRoutes); // ✅ mount admin routes here
console.log("Admin routes mounted at /admin"); // Debug log for mounting

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    adminController.makeAdmin(); // create default admin if not exists
  })
  .catch(err => console.error("❌ MongoDB Error:", err));

// ===== Start Server =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
