const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Park', ParkSchema);
