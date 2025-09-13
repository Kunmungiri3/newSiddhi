const express = require("express");
const path = require("path");
const adminController = require("../controller/adminController");
const Admin = require("../models/admin");

const router = express.Router();

router.post("/welcome/admin", (req, res) => {
    adminController.doLogin(req, res);
});

module.exports = router;