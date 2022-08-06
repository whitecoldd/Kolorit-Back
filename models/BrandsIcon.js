const mongoose = require("mongoose");
const BrandsIconSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BrandsIcon", BrandsIconSchema);
