const express = require('express');
const router = express.Router();
const EmployeeSpeciality = require('../models/EmployeeSpeciality');

// Create EmployeeSpeciality
router.post('/', async (req, res) => {
    try {
        const { designation } = req.body;
        const speciality = new EmployeeSpeciality({ designation });
        await speciality.save();
        res.status(201).json(speciality);
    } catch (error) {
        res.status(500).json({ error: "Error creating Employee Speciality" });
    }
});

// Get All Employee Specialities
router.get('/', async (req, res) => {
    try {
        const specialities = await EmployeeSpeciality.find();
        res.status(200).json(specialities);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Employee Specialities" });
    }
});

// Get Employee Speciality by ID
router.get('/:id', async (req, res) => {
    try {
        const speciality = await EmployeeSpeciality.findById(req.params.id);
        if (!speciality) return res.status(404).json({ error: "Employee Speciality not found" });
        res.status(200).json(speciality);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Employee Speciality" });
    }
});

// Update Employee Speciality
router.put('/:id', async (req, res) => {
    try {
        const { designation } = req.body;
        const speciality = await EmployeeSpeciality.findByIdAndUpdate(req.params.id, { designation }, { new: true });
        if (!speciality) return res.status(404).json({ error: "Employee Speciality not found" });
        res.status(200).json(speciality);
    } catch (error) {
        res.status(500).json({ error: "Error updating Employee Speciality" });
    }
});

// Delete Employee Speciality
router.delete('/:id', async (req, res) => {
    try {
        const speciality = await EmployeeSpeciality.findByIdAndDelete(req.params.id);
        if (!speciality) return res.status(404).json({ error: "Employee Speciality not found" });
        res.status(200).json({ message: "Employee Speciality deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Employee Speciality" });
    }
});

module.exports = router;
