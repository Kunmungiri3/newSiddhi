const express = require("express");
const path = require("path");
const adminController = require("../controller/adminController");
const Admin = require("../models/admin");

const router = express.Router();

router.post("/welcome/admin", (req, res) => {
    adminController.doLogin(req, res);
});
router.get("/listvendors", async (req, res) => {
    adminController.listVendors(req, res);
});
router.get("/listjobseekers", async (req, res) => {
    adminController.listJobseekers(req, res);
});
module.exports = router;