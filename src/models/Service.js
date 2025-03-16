const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    mandatoryArticles: [{
        article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true }, 
        quantity: { type: Number, required: true, default: 1 } // Quantity of the article
    }]
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
