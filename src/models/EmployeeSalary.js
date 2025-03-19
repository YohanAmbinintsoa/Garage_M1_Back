const mongoose = require('mongoose');

const EmployeeSalarySchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    salary: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeSalary', EmployeeSalarySchema);
