const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    mandatoryArticles: [{
        article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true }, 
        quantity: { type: Number, required: true, default: 1 } 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);

const seedService = async () => {
    // Fetch predefined articles
    const motulOil = await Article.findOne({ designation: "Motul 15W-40" });
    const flamingoShampoo = await Article.findOne({ designation: "Flamingo Car Shampoo" });
    const boschBrakes = await Article.findOne({ designation: "Bosch Brake Pads" });

    // Create a new service with the mandatory articles
    const service = new Service({
        designation: "Car Maintenance Service",
        mandatoryArticles: [
            { article: motulOil._id, quantity: 3 }, // 3 units of Motul 15W-40
            { article: flamingoShampoo._id, quantity: 2 }, // 2 units of Flamingo Car Shampoo
            { article: boschBrakes._id, quantity: 1 } // 1 unit of Bosch Brake Pads
        ]
    });

    await service.save();

    console.log("Service created successfully:", service);
};