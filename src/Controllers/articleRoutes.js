const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const ArticleCategory = require('../models/ArticleCategory');
const ArticlePrice = require('../models/ArticlePrice');

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

// Get all articles for a specific category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params; 
        const articles = await Article.find({ articleCategory: categoryId })
            .populate('articleCategory');
            
        if (articles.length === 0) {
            return res.status(404).json({ error: "No articles found for this category" });
        }

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insert a new ArticlePrice
router.post('/unitPrice', async (req, res) => {
    try {
        const { article, unitPrice } = req.body;

        if (!article || !unitPrice) {
            return res.status(400).json({ error: "Article and unitPrice are required" });
        }

        const newArticlePrice = new ArticlePrice({ article, unitPrice });
        await newArticlePrice.save();

        res.status(201).json(newArticlePrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get the latest unit price of an article
router.get('/unitPrice/actual/:articleId', async (req, res) => {
    try {
        const { articleId } = req.params;

        const latestPrice = await ArticlePrice.findOne({ article: articleId })
            .sort({ createdAt: -1 }) // Get the latest entry
            .select('unitPrice');

        if (!latestPrice) {
            return res.status(404).json({ error: "No price found for this article" });
        }

        res.json(latestPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;