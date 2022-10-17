const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    fname: { type: String },
    lname: { type: String },
    password: { type: String, required: true },
    discountcard: [
      {
        discountId: { type: String },
        discountPercent: { type: Number },
      },
    ],
    address: [
      {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        city: { type: String },
        street: { type: String },
        house: { type: String },
        app: { type: String },
        comm: { type: String },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
