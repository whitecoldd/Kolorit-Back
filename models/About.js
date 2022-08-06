const mongoose = require('mongoose')
const AboutSchema = new mongoose.Schema(
    {
        text: { type: String, required: true},
        img: {type: String, required: true},
        header: {type: String, required: true},
        year: {type: Number},
        lng: {type: String, required: true}

    },
    { timestamps: true }
)

module.exports = mongoose.model('About', AboutSchema)