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
        code: {type: String, required: true},
        category: { type: Array, required: true,  },
        brand: { type: String, required: true },
        inStock: { type: Boolean, default: true },
        char1: {type: String},
        char2: {type: String},
        char3: {type: String},
        char4: {type: String},
        char1a: {type: String},
        char2a: {type: String},
        char3a: {type: String},
        char4a: {type: String},
        brandCountry: {type: String},
        originalCountry: {type: String},
        complect: {type: Array},
        singleProd: {type: String},
        weight: {type: String},
        length: {type: String},
        height: {type: String},
        width: {type: String},
        lng: {type: String, required: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('Items', ItemsSchema)