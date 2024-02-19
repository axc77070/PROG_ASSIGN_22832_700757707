const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
  },
  name: {
    type: String,
  },
  main_category: {
    type: String,
  },
  sub_category: {
    type: String,
  },
  image: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  no_of_ratings: {
    type: String,
  },
  actual_price: {
    type: String,
  },
  discount_price: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
