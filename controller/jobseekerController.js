const Jobseeker = require('../models/jobseeker');
const cloudinary = require('cloudinary').v2
let result;
async function saveJobseeker(req, res) {
    try {
        console.log(req.body, 'req.body');
        console.log(req.file, 'req.file');
        if (req.file) {
            cloudinary.config({
                cloud_name: 'dufvmaweq',
                api_key: '515135587521761',
                api_secret: 'hlXM3UayaeIK5SYHFnPZpZIV1wA',
            });
            result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
        }
        let jobseeker = new Jobseeker(req.body);
        if (req.file) {
          jobseeker.cv = result.secure_url;
        }

        await jobseeker.save();
        res.json("Registration successful")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    saveJobseeker,
}
