const mongoose = require('mongoose');

const ArticleCategorySchema = new mongoose.Schema({
    designation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ArticleCategory', ArticleCategorySchema);

//data , delete after test integration
const seedArticleCategories = async () => {
    const categories = [
        { _id: new mongoose.Types.ObjectId("65fabc1234567890abcdef01"), designation: "Lubricants" },
        { _id: new mongoose.Types.ObjectId("65fabc1234567890abcdef02"), designation: "Car Accessories" },
        { _id: new mongoose.Types.ObjectId("65fabc1234567890abcdef03"), designation: "Cleaning Products" },
        { _id: new mongoose.Types.ObjectId("65fabc1234567890abcdef04"), designation: "Engine Parts" },
        { _id: new mongoose.Types.ObjectId("65fabc1234567890abcdef05"), designation: "Braking System" }
    ];

    await ArticleCategory.insertMany(categories);
    console.log("Article categories inserted with predefined IDs");
};