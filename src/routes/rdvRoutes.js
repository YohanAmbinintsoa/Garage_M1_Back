const express = require('express');
const RDV = require('../models/RDV');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { client, service, car, rdvDate, remark, state } = req.body;
        const newRDV = new RDV({ client, service, car, rdvDate, remark, state });
        await newRDV.save();
        res.status(201).json(newRDV);
    } catch (error) {
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


module.exports = router;
