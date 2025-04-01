const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    articleCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ArticleCategory', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);

//data
const seedArticles = async () => {
    const articles = [
        { designation: "Motul 15W-40", articleCategory: "65fabc1234567890abcdef01" }, // Lubricants
        { designation: "Flamingo Car Shampoo", articleCategory: "65fabc1234567890abcdef03" }, // Cleaning Products
        { designation: "Bosch Brake Pads", articleCategory: "65fabc1234567890abcdef05" }, // Braking System
        { designation: "K&N Air Filter", articleCategory: "65fabc1234567890abcdef04" }, // Engine Parts
        { designation: "Car Phone Holder", articleCategory: "65fabc1234567890abcdef02" } // Car Accessories
    ];

    await Article.insertMany(articles);
    console.log("Articles inserted successfully");
};