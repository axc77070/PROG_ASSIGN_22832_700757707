const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product.js");
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1/assignment";

const connect = () => {
  mongoose
    .connect(MONGO_URL)
    .then(console.log("DATABASE CONNECTED"))
    .catch((error) => {
      console.log("DB CONNECTION FAILED");
      console.log(error);
      process.exit(1);
    });
};

connect();

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    if (!products) {
      return res.status(400).json({
        message: "sorry. something went wrong. try again.",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

app.post("/product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    if (savedProduct) {
      res.status(200).json({
        message: "product has been saved",
        savedProduct,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:code", async (req, res) => {
  try {
    const product = await Product.findOne({ code: req.params.code }).exec();

    if (!product) {
      return res.status(400).json({
        message: "sorry.we cannot get the requested product",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/products/:code", async (req, res) => {
  try {
    const product = await Product.deleteOne({ code: req.params.code }).exec();
    if (product.deletedCount == 0) {
      return res.status(400).json({
        message: "sorry. record not found!!!!",
      });
    }
    return res.status(200).json({
      message: "product record has been deleted successfully!!",
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/products/:code", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { code: req.params.code },
      { $set: req.body }
    ).exec();

    return res.status(200).json({
      message: "record has been updated",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
