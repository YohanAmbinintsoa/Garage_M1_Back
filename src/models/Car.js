const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    carModel: { type: mongoose.Schema.Types.ObjectId, ref: 'CarModel', required: true },  // Reference to CarModel
    year: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Reference to User (owner)
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
