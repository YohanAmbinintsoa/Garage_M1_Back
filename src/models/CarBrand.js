const mongoose = require('mongoose');

const CarBrandSchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CarBrand', CarBrandSchema);

//data
const seedCarBrands = async () => {
    const carBrands = [
        { _id: "65fdef1234567890abcde001", designation: "Toyota" },
        { _id: "65fdef1234567890abcde002", designation: "Ford" },
        { _id: "65fdef1234567890abcde003", designation: "BMW" },
        { _id: "65fdef1234567890abcde004", designation: "Mercedes-Benz" },
        { _id: "65fdef1234567890abcde005", designation: "Honda" }
    ];

    await CarBrand.insertMany(carBrands);
    console.log("Car brands inserted successfully");
};
