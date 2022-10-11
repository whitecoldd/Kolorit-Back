const mongoose = require("mongoose");
const ArticlesSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    img: { type: String, required: true },
    header: { type: String, required: true },
    lng: { type: String, required: true, default: "ru" },
    productId: {
      type: Array,
      unique: false,
    },
    cat: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Articles", ArticlesSchema);
