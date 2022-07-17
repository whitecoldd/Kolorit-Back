const mongoose = require('mongoose')
const SliderSchema = new mongoose.Schema(
    {
        header: { type: String, required: true },
        img: {type: String, required: true},
        text: {type: String},

    },
    { timestamps: true }
)

module.exports = mongoose.model('Slider', SliderSchema)