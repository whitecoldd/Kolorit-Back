const mongoose = require('mongoose')
const ContactsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        img: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
        workHours: {type: String, required: true},
        workHoursH: {type: String, required: true},
        lng: {type: String, required: true, default: "ru"}

    },
    { timestamps: true }
)

module.exports = mongoose.model('Contacts', ContactsSchema)