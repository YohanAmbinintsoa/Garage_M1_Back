const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    articleCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ArticleCategory', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
