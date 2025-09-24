const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const jobSeekerRoutes = require("./routes/jobseeker");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve CV files
app.use("/css", express.static("css"));         // serve static css
app.use(express.static("public"));              // serve public files

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/jobseekers", jobSeekerRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("index"); // renders views/index.ejs
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

