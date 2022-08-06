const mongoose = require('mongoose')
const SubSubCategoriesSchema = new mongoose.Schema(
    {
        img: {type: String, required: true},
        name: {type: String, required: true},
        lng: {type: String, required: true}

    },
    { timestamps: true }
)

module.exports = mongoose.model('SubSubCategories', SubSubCategoriesSchema)