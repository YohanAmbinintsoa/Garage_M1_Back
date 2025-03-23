const mongoose = require('mongoose');

const FactureRowSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
});

const ClientServiceFactureSchema = new mongoose.Schema({
    clientService: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientService', required: true },
    factureRows: [FactureRowSchema] // Array of facture rows
}, { timestamps: true });

module.exports = mongoose.model('ClientServiceFacture', ClientServiceFactureSchema);
