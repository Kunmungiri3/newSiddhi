
const express = require("express");
const path = require("path");
const connect = require("./connection");
const user = require("./routes/jobseeker");
const vendor = require("./routes/vendor");
const admin = require("./routes/admin");
const makeAdmin=require("./controller/adminController");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.render("index"));
app.use("/", user);          // ✅ fixed typo
app.use("/", admin);
app.use("/", vendor);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Static files
app.use("/css", express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "public")));

// Connect DB first, then start server

 app.listen(3000, "0.0.0.0", (err) => {
  if (err) {
    console.error("Server failed:", err);
  } else {
    console.log("✅ Server is running on http://0.0.0.0:3000");
  }
});

  connect();
  makeAdmin.makeAdmin();
  // Home
app.get("/", (req, res) => {
  res.render("index");   // renders views/index.ejs
});

// Gallery
app.get("/gallery", (req, res) => {
  res.render("gallery"); // renders views/gallery.ejs
});

// Contact
app.get("/contact", (req, res) => {
  res.render("contact"); // renders views/contact.ejs
});

