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
        message: "Something went wrong. Try again.",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    if (savedProduct) {
      res.status(200).json({
        message: "Product has been created",
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
        message: "Sorry, Requested product is not found",
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
        message: "Sorry. Record not found!!!!",
      });
    }
    return res.status(200).json({
      message: "Product record has been deleted successfully!!",
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
      message: "Record has been updated",
    });
  } catch (error) {
    console.log(error);
  }
  app.patch("/products/:code", async (req, res) => {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { code: req.params.code },
        { $set: req.body },
        { new: true }
      ).exec();
  
      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      return res.status(200).json({
        message: "Product has been updated",
        product: updatedProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.patch("/products/:code", async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { code: req.params.code },
      { $set: req.body },
      { new: true }
    ).exec();

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product has been updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
