const mongoose = require('mongoose');

const RDVSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    rdvDate: { type: Date, required: true },
    remark: { type: String },
    state: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('RDV', RDVSchema);
