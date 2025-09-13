
const Vendor = require("../models/vendor");
async function saveVendor(req, res) {
  try {
    let vendor = new Vendor(req.body);
    await vendor.save();
    res.render("done");
    console.log("data saved successfully...");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { 
    saveVendor 
};
