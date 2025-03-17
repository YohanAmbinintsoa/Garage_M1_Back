const express = require('express');
const mongoose = require('mongoose');
const ArticleCategory = require('../models/ArticleCategory');
// Define the ArticleCategory schema and model
const articleCategorySchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

// Create an Express Router
const router = express.Router();

// Create a new article category (POST)
router.post('/', async (req, res) => {
    const { designation } = req.body;
    try {
        const newCategory = new ArticleCategory({ designation });
        await newCategory.save();
        res.status(201).json({ message: "Article category created successfully", category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the article category." });
    }
});

// Get all article categories (GET)
router.get('/', async (req, res) => {
    try {
        const categories = await ArticleCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching article categories." });
    }
});

// Get a single article category by ID (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await ArticleCategory.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Article category not found." });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the article category." });
    }
});

// Update an article category (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { designation } = req.body;
    try {
        const updatedCategory = await ArticleCategory.findByIdAndUpdate(
            id,
            { designation },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Article category not found." });
        }

        res.status(200).json({ message: "Article category updated successfully", category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the article category." });
    }
});

// Delete an article category (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await ArticleCategory.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Article category not found." });
        }

        res.status(200).json({ message: "Article category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the article category." });
    }
});

// Export the router
module.exports = router;
