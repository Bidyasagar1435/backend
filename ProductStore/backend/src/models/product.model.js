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
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
