const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    article: { type: String, required: true },
    moveType: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    moveDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Stock', StockSchema);
