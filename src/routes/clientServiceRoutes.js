const express = require('express');
const router = express.Router();
const ClientService = require('../models/ClientService');

// Create ClientService
router.post('/', async (req, res) => {
    try {
        const { client, service, car, park, advancement } = req.body;
        const newClientService = new ClientService({ client, service, car, park, advancement });
        await newClientService.save();
        res.status(201).json(newClientService);
    } catch (error) {
        res.status(500).json({ error: "Error creating ClientService" });
    }
});

// Get All ClientServices
router.get('/', async (req, res) => {
    try {
        const clientServices = await ClientService.find().populate('client service car park');
        res.status(200).json(clientServices);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ClientServices" });
    }
});

// Get ClientService by ID
router.get('/:id', async (req, res) => {
    try {
        const clientService = await ClientService.findById(req.params.id).populate('client service car park');
        if (!clientService) return res.status(404).json({ error: "ClientService not found" });
        res.status(200).json(clientService);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ClientService" });
    }
});

// Update ClientService
router.put('/:id', async (req, res) => {
    try {
        const { client, service, car, park, advancement } = req.body;
        const updatedClientService = await ClientService.findByIdAndUpdate(req.params.id, { client, service, car, park, advancement }, { new: true });
        if (!updatedClientService) return res.status(404).json({ error: "ClientService not found" });
        res.status(200).json(updatedClientService);
    } catch (error) {
        res.status(500).json({ error: "Error updating ClientService" });
    }
});

// Delete ClientService
router.delete('/:id', async (req, res) => {
    try {
        const deletedClientService = await ClientService.findByIdAndDelete(req.params.id);
        if (!deletedClientService) return res.status(404).json({ error: "ClientService not found" });
        res.status(200).json({ message: "ClientService deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting ClientService" });
    }
});

module.exports = router;
