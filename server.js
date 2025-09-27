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
app.use("/uploads", express.static("uploads"));  // serve CV files
app.use("/css", express.static("css"));          // serve static css
app.use(express.static("public"));               // serve public files

// ===== View Engine =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== Admin Login Page =====
app.get("/admin", (req, res) => {
  res.render("login"); // show login form (login.ejs)
});

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
