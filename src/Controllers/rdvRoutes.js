const express = require('express');
const RDV = require('../models/RDV');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { service, car, rdvDate, remark } = req.body;
        const client = req.user.id;
        const state = 0;
        const newRDV = new RDV({ client, service, car, rdvDate, remark, state });
        await newRDV.save();
        res.status(201).json(newRDV);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error creating RDV" });
    }
});

router.get('/', async (req, res) => {
    try {
        const rdvs = await RDV.find()
            .populate('client', 'name firstname -_id')
            .populate('service', 'designation -_id')
            .populate('car', 'designation year -_id');
        res.status(200).json(rdvs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching RDVs" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rdv = await RDV.findById(req.params.id)
            .populate('client', 'name firstname -_id')
            .populate('service', 'designation -_id')
            .populate('car', 'designation year -_id');
        if (!rdv) return res.status(404).json({ error: "RDV not found" });
        res.status(200).json(rdv);
    } catch (error) {
        res.status(500).json({ error: "Error fetching RDV" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedRDV = await RDV.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRDV) return res.status(404).json({ error: "RDV not found" });
        res.status(200).json(updatedRDV);
    } catch (error) {
        res.status(500).json({ error: "Error updating RDV" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedRDV = await RDV.findByIdAndDelete(req.params.id);
        if (!deletedRDV) return res.status(404).json({ error: "RDV not found" });
        res.status(200).json({ message: "RDV deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting RDV" });
    }
});

// Get RDVs by client ID
router.get('/client/:clientId', async (req, res) => {
    try {
        const rdvs = await RDV.find({ client: req.params.clientId })
            .populate('client', 'name firstname -_id')
            .populate('service', 'designation -_id')
            .populate('car', 'designation year -_id');

        if (!rdvs.length) return res.status(404).json({ error: "No RDVs found for this client" });

        res.status(200).json(rdvs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching RDVs for client" });
    }
});

// Get all RDVs for a specific client, with optional state filter
router.get('/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params; // Get the client ID from the URL parameters
        const { state } = req.query; // Get the state from the query parameters (if provided)

        // Build the filter object
        let filter = { client: clientId };

        if (state) {
            filter.state = state; // Add state to the filter if specified
        }

        // Retrieve the RDVs from the database with the filter
        const rdvs = await RDV.find(filter)
            .populate('service') // Populate the service field with full details
            .populate('car') // Populate the car field with full details
            .populate('client'); // Populate the client field with full details

        if (rdvs.length === 0) {
            return res.status(404).json({ error: "No RDVs found for this client" });
        }

        res.json(rdvs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
