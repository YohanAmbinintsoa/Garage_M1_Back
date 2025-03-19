const express = require('express');
const router = express.Router();
const ClientServiceFacture = require('../models/ClientServiceFacture');

// Create ClientServiceFacture
router.post('/', async (req, res) => {
    try {
        const { clientService, article, quantity, unitPrice } = req.body;
        const clientServiceFacture = new ClientServiceFacture({ clientService, article, quantity, unitPrice });
        await clientServiceFacture.save();
        res.status(201).json(clientServiceFacture);
    } catch (error) {
        res.status(500).json({ error: "Error creating ClientServiceFacture" });
    }
});

// Get All ClientServiceFactures
router.get('/', async (req, res) => {
    try {
        const clientServiceFactures = await ClientServiceFacture.find().populate('clientService article');
        res.status(200).json(clientServiceFactures);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ClientServiceFactures" });
    }
});

// Get ClientServiceFacture by ID
router.get('/:id', async (req, res) => {
    try {
        const clientServiceFacture = await ClientServiceFacture.findById(req.params.id).populate('clientService article');
        if (!clientServiceFacture) return res.status(404).json({ error: "ClientServiceFacture not found" });
        res.status(200).json(clientServiceFacture);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ClientServiceFacture" });
    }
});

// Update ClientServiceFacture
router.put('/:id', async (req, res) => {
    try {
        const { clientService, article, quantity, unitPrice } = req.body;
        const clientServiceFacture = await ClientServiceFacture.findByIdAndUpdate(req.params.id, { clientService, article, quantity, unitPrice }, { new: true });
        if (!clientServiceFacture) return res.status(404).json({ error: "ClientServiceFacture not found" });
        res.status(200).json(clientServiceFacture);
    } catch (error) {
        res.status(500).json({ error: "Error updating ClientServiceFacture" });
    }
});

// Delete ClientServiceFacture
router.delete('/:id', async (req, res) => {
    try {
        const clientServiceFacture = await ClientServiceFacture.findByIdAndDelete(req.params.id);
        if (!clientServiceFacture) return res.status(404).json({ error: "ClientServiceFacture not found" });
        res.status(200).json({ message: "ClientServiceFacture deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting ClientServiceFacture" });
    }
});

module.exports = router;
