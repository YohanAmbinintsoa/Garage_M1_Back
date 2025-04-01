const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Article = require('../models/Article');


router.post('/', async (req, res) => {
    try {
        const { designation, mandatoryArticles } = req.body;

        const newService = new Service({ designation, mandatoryArticles });
        await newService.save();

        res.status(201).json({
            message: "Service created successfully",
            service: newService
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the service" });
    }
});

router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
            .populate({
                path: 'mandatoryArticles.article', // Populate the article field
                select: 'designation' 
            });
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching services" });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id)
            .populate({
                path: 'mandatoryArticles.article', // Populate the article field
                select: 'designation'
            });

        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the service" });
    }
});

// Update a service by ID (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { designation, mandatoryArticles } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(id, { designation, mandatoryArticles }, { new: true });
        if (!updatedService) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json({
            message: "Service updated successfully",
            service: updatedService
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the service" });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the service" });
    }
});

router.get('/:clientServiceId', async (req, res) => {
    try {
        const { clientServiceId } = req.params;

        const factures = await ClientServiceFacture.find({ clientService: clientServiceId })
            .populate('factureRows.article'); // Populate article details in facture rows

        if (!factures || factures.length === 0) {
            return res.status(404).json({ error: "No factures found for this client service" });
        }

        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all factures for a specific service
router.get('/factures/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { startDate, endDate } = req.query;

        const dateFilter = {};
        if (startDate) dateFilter.createdAt = { $gte: new Date(startDate) };
        if (endDate) {
            dateFilter.createdAt = dateFilter.createdAt || {};
            dateFilter.createdAt.$lte = new Date(endDate);
        }

        // Find all ClientServices related to the given service
        const clientServices = await ClientService.find({ service: serviceId }).select('_id');

        if (clientServices.length === 0) {
            return res.status(404).json({ error: "No client services found for this service" });
        }

        // Extract clientService IDs
        const clientServiceIds = clientServices.map(cs => cs._id);

        // Find all factures related to those clientServices
        const factures = await ClientServiceFacture.find({ clientService: { $in: clientServiceIds } })
            .populate('factureRows.article');

        if (factures.length === 0) {
            return res.status(404).json({ error: "No factures found for this service" });
        }

        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add an article to mandatoryArticles
router.put('/addMandatoryArticle/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { articleId, quantity } = req.body;

        if (!articleId || !quantity) {
            return res.status(400).json({ error: "articleId and quantity are required" });
        }

        await Service.updateOne(
            { _id: serviceId },
            { $push: { mandatoryArticles: { article: articleId, quantity: quantity } } }
        );

        res.json({ message: "Article added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
