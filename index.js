require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Routes
const userRoutes = require("./routes/jobseeker");
const vendorRoutes = require("./routes/vendor");
const adminRoutes = require("./routes/admin");

// Controller
const { makeAdmin } = require("./controller/adminController");

const app = express();
console.log("here...");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Static files
app.use("/css", express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("index"));
app.get("/gallery", (req, res) => res.render("gallery"));
app.get("/contact", (req, res) => res.render("contact"));

// Admin login page
app.get("/admin", (req, res) => res.render("login"));

// ===== Redirects for user-friendly URLs =====
app.get("/register", (req, res) => res.redirect("/api/jobseekers/register"));
app.get("/vendor-registration", (req, res) => res.redirect("/api/vendors/vendor-registration"));

app.use("/api/jobseekers", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/admin", adminRoutes);




// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");

    // ✅ Ensure default admin exists
    makeAdmin();
  })
  .catch(err => console.error("❌ DB connection error:", err));

// ===== Start server =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error("❌ Server failed:", err);
  } else {
    console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  }
});
