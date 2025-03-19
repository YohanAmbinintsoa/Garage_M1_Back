const express = require('express');
const router = express.Router();
const EmployeeSalary = require('../models/EmployeeSalary');

// Create EmployeeSalary
router.post('/', async (req, res) => {
    try {
        const { employee, salary } = req.body;
        const employeeSalary = new EmployeeSalary({ employee, salary });
        await employeeSalary.save();
        res.status(201).json(employeeSalary);
    } catch (error) {
        res.status(500).json({ error: "Error creating EmployeeSalary" });
    }
});

// Get All EmployeeSalaries
router.get('/', async (req, res) => {
    try {
        const employeeSalaries = await EmployeeSalary.find().populate('employee');
        res.status(200).json(employeeSalaries);
    } catch (error) {
        res.status(500).json({ error: "Error fetching EmployeeSalaries" });
    }
});

// Get EmployeeSalary by ID
router.get('/:id', async (req, res) => {
    try {
        const employeeSalary = await EmployeeSalary.findById(req.params.id).populate('employee');
        if (!employeeSalary) return res.status(404).json({ error: "EmployeeSalary not found" });
        res.status(200).json(employeeSalary);
    } catch (error) {
        res.status(500).json({ error: "Error fetching EmployeeSalary" });
    }
});

// Update EmployeeSalary
router.put('/:id', async (req, res) => {
    try {
        const { employee, salary } = req.body;
        const employeeSalary = await EmployeeSalary.findByIdAndUpdate(req.params.id, { employee, salary }, { new: true });
        if (!employeeSalary) return res.status(404).json({ error: "EmployeeSalary not found" });
        res.status(200).json(employeeSalary);
    } catch (error) {
        res.status(500).json({ error: "Error updating EmployeeSalary" });
    }
});

// Delete EmployeeSalary
router.delete('/:id', async (req, res) => {
    try {
        const employeeSalary = await EmployeeSalary.findByIdAndDelete(req.params.id);
        if (!employeeSalary) return res.status(404).json({ error: "EmployeeSalary not found" });
        res.status(200).json({ message: "EmployeeSalary deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting EmployeeSalary" });
    }
});

module.exports = router;
