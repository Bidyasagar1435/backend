const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
