const mongoose = require('mongoose');

const ClientServiceSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    park: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true },
    advancement: { type: Number, required: true , default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ClientService', ClientServiceSchema);
