require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Routes
const userRoutes = require("./routes/jobseeker");
const vendorRoutes = require("./routes/vendor");
const adminRoutes = require("./routes/admin");

// Controller
const adminController = require("./controller/adminController");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Static files
app.use("/css", express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


// Routes
app.get("/", (req, res) => res.render("index"));
app.get("/gallery", (req, res) => res.render("gallery"));
app.get("/contact", (req, res) => res.render("contact"));

app.use("/", userRoutes);
app.use("/", vendorRoutes);
app.use("/", adminRoutes);

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ Create default admin if not exists
    if (typeof adminController.makeAdmin === "function") {
      adminController.makeAdmin();
    }
  })
  .catch(err => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error("❌ Server failed:", err);
  } else {
    console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  }
});
