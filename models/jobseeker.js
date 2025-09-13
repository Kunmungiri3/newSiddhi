const mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const jobseekerSchema = new Schema({
    name: { type: String, required: true },
    father: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },  // ✅ fixed typo
    qualification: { type: String },
    address: { type: String, required: true }, // consider renaming to "address"
    aadhar: { type: Number, required: true },
    cv: { type: String },
    createdAt: Date,
    updatedAt: Date
});

jobseekerSchema.plugin(timeStamps, { index: true });

module.exports = mongoose.model('jobseeker', jobseekerSchema);
