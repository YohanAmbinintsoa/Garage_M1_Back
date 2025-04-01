const mongoose = require('mongoose');

const ArticlePriceSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    unitPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ArticlePrice', ArticlePriceSchema);

//data
const seedArticlePrices = async () => {
    const articlePrices = [
        { article: "65fdef1234567890abcdef01", unitPrice: 25.99 }, // Motul 15W-40
        { article: "65fdef1234567890abcdef02", unitPrice: 5.49 },  // Flamingo Car Shampoo
        { article: "65fdef1234567890abcdef03", unitPrice: 45.00 }, // Bosch Brake Pads
        { article: "65fdef1234567890abcdef04", unitPrice: 30.75 }, // K&N Air Filter
        { article: "65fdef1234567890abcdef05", unitPrice: 12.99 }  // Car Phone Holder
    ];

    await ArticlePrice.insertMany(articlePrices);
    console.log("Article prices inserted successfully");
};