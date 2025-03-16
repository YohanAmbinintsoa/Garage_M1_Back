const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const ArticleCategory = require('../models/ArticleCategory');

// Create Article
router.post('/', async (req, res) => {
    try {
        const { designation, articleCategory } = req.body;

        // Validate if the category exists
        const category = await ArticleCategory.findById(articleCategory);
        if (!category) {
            return res.status(400).json({ error: "Invalid Article Category ID" });
        }

        const newArticle = new Article({ designation, articleCategory });
        await newArticle.save();

        res.status(201).json({
            message: "Article created successfully",
            article: newArticle
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the article" });
    }
});

// Get All Articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().populate('articleCategory');
        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching articles" });
    }
});

module.exports = router;
