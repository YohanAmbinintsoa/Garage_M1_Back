const mongoose = require('mongoose');

const EmployeeSpecialitySchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeSpeciality', EmployeeSpecialitySchema);
