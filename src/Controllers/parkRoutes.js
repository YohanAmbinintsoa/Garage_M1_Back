const express = require('express');
const router = express.Router();
const Park = require('../models/Park');

// Create Park
router.post('/', async (req, res) => {
    try {
        const { designation } = req.body;
        const park = new Park({ designation });
        await park.save();
        res.status(201).json(park);
    } catch (error) {
        res.status(500).json({ error: "Error creating park" });
    }
});

// Get All Parks
router.get('/', async (req, res) => {
    try {
        const parks = await Park.find();
        res.status(200).json(parks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching parks" });
    }
});

// Get Park by ID
router.get('/:id', async (req, res) => {
    try {
        const park = await Park.findById(req.params.id);
        if (!park) return res.status(404).json({ error: "Park not found" });
        res.status(200).json(park);
    } catch (error) {
        res.status(500).json({ error: "Error fetching park" });
    }
});

// Update Park
router.put('/:id', async (req, res) => {
    try {
        const { designation } = req.body;
        const park = await Park.findByIdAndUpdate(req.params.id, { designation }, { new: true });
        if (!park) return res.status(404).json({ error: "Park not found" });
        res.status(200).json(park);
    } catch (error) {
        res.status(500).json({ error: "Error updating park" });
    }
});

// Delete Park
router.delete('/:id', async (req, res) => {
    try {
        const park = await Park.findByIdAndDelete(req.params.id);
        if (!park) return res.status(404).json({ error: "Park not found" });
        res.status(200).json({ message: "Park deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting park" });
    }
});

module.exports = router;
