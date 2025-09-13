const express = require('express')
const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const Jobseeker = require('../models/jobseeker');
const Vendor = require('../models/vendor');
async function makeAdmin() {
    try {
        let admin = await Admin.findOne({ email: "kunmungiri1@gmail.com" });
        if (admin) {
            console.log("user updated....")
        } else {
            let admin = new Admin();
            admin.username = "kunmungiri1@gmail.com";
            let encryptedPassword = bcrypt.hashSync("12345", 10)
            admin.password = encryptedPassword;

            await admin.save();
            console.log("Admin created Successfully..................");
        }

    } catch (err) {
        console.log(err)
    }
}
async function doLogin(req, res) {
    try {
        console.log(req.body, 'req.body')
        let admin = await Admin.findOne({ username: req.body.username })
        console.log(admin)
        if (admin) {
            let validPassword = await bcrypt.compare(req.body.password, admin.password)
            if (validPassword) {
                    let jobseekers = await Jobseeker.find({})
                    let vendors = await Vendor.find({})
                    res.render('admin', {
                         jobseekers: jobseekers,
                         vendors: vendors

                    })
                }else{
                    res.json('Invalid login/Password...')
                }

            } else {
                res.end("invalid login/Password...")
            }
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    makeAdmin,
    doLogin,
}
