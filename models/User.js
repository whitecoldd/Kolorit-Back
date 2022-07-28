const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        fname: { type: String, required: true},
        lname: { type: String, required: true},
        password: { type: String, required: true, select: false },
        address: {type: Array},
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)