const mongoose = require('mongoose');

const ClientServiceFactureSchema = new mongoose.Schema({
    clientService: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientService', required: true },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ClientServiceFacture', ClientServiceFactureSchema);
