const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    birthDate: { type: String, required: true },
    CIN: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    specialities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeSpeciality' }],
    state: { type: Number, required: true },
    chief : {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
