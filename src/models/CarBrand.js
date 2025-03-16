const mongoose = require('mongoose');

const CarBrandSchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CarBrand', CarBrandSchema);
