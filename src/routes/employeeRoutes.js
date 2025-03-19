const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

// Create Employee
router.post('/', async (req, res) => {
    try {
        const { name, firstname, email, password, birthDate, CIN, address, phone, specialities, state } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = new Employee({ name, firstname, email, password: hashedPassword, birthDate, CIN, address, phone, specialities, state });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Error creating Employee" });
    }
});

// Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().populate('specialities');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Employees" });
    }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('specialities');
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Employee" });
    }
});

// Update Employee
router.put('/:id', async (req, res) => {
    try {
        const { name, firstname, email, password, birthDate, CIN, address, phone, specialities, state } = req.body;
        let updateFields = { name, firstname, email, birthDate, CIN, address, phone, specialities, state };
        
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const employee = await Employee.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Error updating Employee" });
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Employee" });
    }
});

module.exports = router;
