const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
    {
        userFName: { type: String, unique: false },

        productId: {
            type: Array,
            unique: false
        },
        quantity: {
            type: Number,
            default: 1,
        },
        payment: { type: String, required: true },
        delType: { type: String, required: true },
        address: { type: String },
        status: { type: String, default: 'В обработке' },

    },
    { timestamps: true }
)
module.exports = mongoose.model('Order', OrderSchema)