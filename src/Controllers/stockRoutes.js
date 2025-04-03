const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Create a new stock entry
router.post('/', async (req, res) => {
    try {
        const stock = new Stock(req.body);
        await stock.save();
        res.status(201).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all stock entries
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a stock entry by ID
router.get('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) return res.status(404).json({ error: "Stock entry not found" });
        res.json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a stock entry
router.put('/:id', async (req, res) => {
    try {
        const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!stock) return res.status(404).json({ error: "Stock entry not found" });
        res.json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a stock entry
router.delete('/:id', async (req, res) => {
    try {
        const stock = await Stock.findByIdAndDelete(req.params.id);
        if (!stock) return res.status(404).json({ error: "Stock entry not found" });
        res.json({ message: "Stock entry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Group stock by article and sum the quantity and unit price
router.get('/group-by-article', async (req, res) => {
    try {
        const groupedStocks = await Stock.aggregate([
            {
                $group: {
                    _id: "$article",
                    totalQuantity: { $sum: "$quantity" },
                    avgUnitPrice: { $avg: "$unitPrice" },
                    moves: { $push: "$$ROOT" } // Keeps all stock movements for the article
                }
            }
        ]);
        res.json(groupedStocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
