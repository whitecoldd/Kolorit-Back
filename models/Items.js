const mongoose = require('mongoose')
const ItemsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number },
        salePrice: {type: Number, required: true},
        promo: {type: String, default: ' '},
        promoType: {type: String, default: 'transparent' },
        currency: {type: String, required: true},
        img: {type: String, required: true},
        code: {type: String, required: true, unique: true },
        category: { type: Array, required: true },
        inStock: { type: Boolean, default: true },

    },
    { timestamps: true }
)

module.exports = mongoose.model('Items', ItemsSchema)