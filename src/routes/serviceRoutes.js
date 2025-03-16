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

module.exports = router;
