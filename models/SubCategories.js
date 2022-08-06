const mongoose = require('mongoose')
const SubCategoriesSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},
        name: {type: String, required: true},
        lng: {type: String, required: true}

    },
    { timestamps: true }
)

module.exports = mongoose.model('SubCategories', SubCategoriesSchema)