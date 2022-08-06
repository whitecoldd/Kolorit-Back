const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
    {
        userName: { type: String,required: true, unique: false },
        phone : {type: String},
        email : {type: String},
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
        sum: {type: Number},
        status: { type: String, default: 'Новый' },

    },
    { timestamps: true }
)
module.exports = mongoose.model('Order', OrderSchema)