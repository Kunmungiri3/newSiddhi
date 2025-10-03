const express = require("express");
const path = require("path");
const vendorController = require("../controller/vendorcontroller");
const vendor = require("../models/vendor");
const xlsx = require("xlsx");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
router.post('/save/vendor',(req,res)=>{
    vendorController.saveVendor(req,res);
})

// List Vendors
 router.get('/list', vendorController.listVendors);

// Edit Vendor - Render edit form
router.get('/edit/:id', vendorController.editVendor);

// Update Vendor
router.post('/edit/:id', vendorController.updateVendor);

// Delete Vendor
router.post('/delete/:id', vendorController.deleteVendor);

// Export Vendors to Excel
router.get('/export', async (req, res) => {
  try {
    const vendors = await vendor.find().lean();
    const worksheet = xlsx.utils.json_to_sheet(vendors);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Vendors");
    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
    res.setHeader("Content-Disposition", "attachment; filename=vendors.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Error exporting vendors to Excel");
  }
});

// router.get('/vendor-portal',(req,res)=>{
//     res.render('vendor-portal')
// })
router.get('/vendor-registration',(req,res)=>{
    res.render('vendor-registration')
})

module.exports=router;
