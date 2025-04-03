const mongoose = require('mongoose');

const ArticlePriceSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    unitPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ArticlePrice', ArticlePriceSchema);
