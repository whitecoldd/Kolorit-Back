const mongoose = require('mongoose')
const SubCategoriesSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        img: {type: String, required: true},
        lng: {type: String, required: true, default: "ru"},
        cat: {type: String, required: true}

    },
    { timestamps: true }
)

module.exports = mongoose.model('SubCategories', SubCategoriesSchema)