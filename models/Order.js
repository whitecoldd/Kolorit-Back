const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },

        productId: {
            type: Array
        },
        quantity: {
            type: Number,
            default: 1,
        },
        payment: { type: String, required: true },
        delType: { type: String, required: true },
        address: { type: String, required: true },
        status: { type: String, default: 'В обработке' },

    },
    { timestamps: true }
)
module.exports = mongoose.model('Order', OrderSchema)