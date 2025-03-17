const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    firstname:{ type: String, required: true },
    username:{ type: String, required: true },
    email: { type: String, required: true },
    birthdate: { type: Date, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Test', TestSchema);