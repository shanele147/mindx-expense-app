const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  title: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  color: {
    type: Array,
    require: true,
  },
  shortDecs: {
    type: String,
    require: true,
  },
  fullDesc: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("product", ProductSchema);
