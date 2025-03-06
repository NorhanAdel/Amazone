const express = require("express");
const router = new express.Router();
const products = require("../model/product");
const user = require("../model/user");
const mongoose = require("mongoose");
router.get("/allproducts", async (req, res) => {
  try {
    const productdata = await products.find();
    res.status(201).json(productdata);
    console.log(productdata);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/getproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const SingleProduct = await products.findOne({ id: id });
    if (SingleProduct) {
      res.status(200).json(SingleProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.post("/addcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userID } = req.body;  

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const cart = await products.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!cart) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userContact = await user.findOne({
      _id: new mongoose.Types.ObjectId(userID),
    });
    if (!userContact) {
      return res.status(401).json({ error: "Invalid user" });
    }

    const cartData = await userContact.addDataCart(cart);
    console.log(cartData);
    await userContact.save();

    res
      .status(201)
      .json({ message: "Product added to cart", user: userContact });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
