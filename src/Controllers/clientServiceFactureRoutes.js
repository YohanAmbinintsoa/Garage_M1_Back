const express = require('express');
const ClientServiceFacture = require('../models/ClientServiceFacture');
const ClientService = require('../models/ClientService');

const router = express.Router();

// Create ClientServiceFacture
router.post('/', async (req, res) => {
    try {
        const clientServiceFacture = new ClientServiceFacture(req.body);
        await clientServiceFacture.save();
        res.status(201).json(clientServiceFacture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all ClientServiceFactures
router.get('/', async (req, res) => {
    try {
        const factures = await ClientServiceFacture.find().populate('clientService').populate('factureRows.article');
        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get ClientServiceFacture by ID
router.get('/:id', async (req, res) => {
    try {
        const facture = await ClientServiceFacture.findById(req.params.id).populate('clientService').populate('factureRows.article');
        if (!facture) return res.status(404).json({ error: "Facture not found" });
        res.json(facture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new row to factureRows (update existing facture)
router.put('/:id/addRow', async (req, res) => {
    try {
        const { article, quantity, unitPrice } = req.body;
        const facture = await ClientServiceFacture.findById(req.params.id);
        
        if (!facture) return res.status(404).json({ error: "Facture not found" });

        // Append new facture row
        facture.factureRows.push({ article, quantity, unitPrice });

        await facture.save();
        res.json(facture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete ClientServiceFacture
router.delete('/:id', async (req, res) => {
    try {
        const facture = await ClientServiceFacture.findByIdAndDelete(req.params.id);
        if (!facture) return res.status(404).json({ error: "Facture not found" });
        res.json({ message: "Facture deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;

        // Find all ClientService IDs related to the client
        const clientServices = await ClientService.find({ client: clientId }).select('_id');

        if (clientServices.length === 0) {
            return res.status(404).json({ error: "Aucune facture trouvée pour ce client" });
        }

        // Extract the clientService IDs
        const clientServiceIds = clientServices.map(cs => cs._id);

        // Retrieve factures linked to those clientService IDs
        const factures = await ClientServiceFacture.find({ clientService: { $in: clientServiceIds } })
            .populate('clientService')
            .populate('factureRows.article');

        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

module.exports = router;
