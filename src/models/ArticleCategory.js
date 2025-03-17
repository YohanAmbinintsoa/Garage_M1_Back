const mongoose = require('mongoose');

const ArticleCategorySchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ArticleCategory', ArticleCategorySchema);
