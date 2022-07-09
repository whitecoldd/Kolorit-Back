const mongoose = require('mongoose')
const ItemsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number },
        salePrice: {type: Number, required: true},
        promo: {type: String, required: true},
        promoType: {type: String, required: true},
        currency: {type: String, required: true},
        img: {type: String, required: true},
        code: {type: String, required: true},
        category: { type: Array },
        inStock: { type: Boolean, default: true },

    },
    { timestamps: true }
)

module.exports = mongoose.model('Items', ItemsSchema)