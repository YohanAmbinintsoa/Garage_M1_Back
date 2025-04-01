const mongoose = require('mongoose');

const CarModelSchema = new mongoose.Schema({
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'CarBrand', required: true }, 
    designation: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('CarModel', CarModelSchema);

const seedCarModels = async () => {
    const toyota = await CarBrand.findOne({ designation: 'Toyota' });
    const ford = await CarBrand.findOne({ designation: 'Ford' });
    const bmw = await CarBrand.findOne({ designation: 'BMW' });

    const carModels = [
        { brand: toyota._id, designation: 'Corolla' },
        { brand: toyota._id, designation: 'Camry' },
        { brand: ford._id, designation: 'Mustang' },
        { brand: ford._id, designation: 'F-150' },
        { brand: bmw._id, designation: 'X5' },
        { brand: bmw._id, designation: '3 Series' }
    ];

    await CarModel.insertMany(carModels);
    console.log("Car models inserted successfully");
};