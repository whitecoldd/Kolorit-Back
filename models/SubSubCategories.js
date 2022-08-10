const mongoose = require('mongoose')
const SubSubCategoriesSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        lng: {type: String, required: true, default: "ru"},
        subcat: {type: Array, required: true},
        img: {type: String},

    },
    { timestamps: true }
)

module.exports = mongoose.model('SubSubCategories', SubSubCategoriesSchema)