const mongoose = require('mongoose');

const CarModelSchema = new mongoose.Schema({
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'CarBrand', required: true }, 
    designation: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('CarModel', CarModelSchema);
