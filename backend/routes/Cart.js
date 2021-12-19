const express = require("express");
const router = express.Router();
const {
  generateAccessToken,
  verifyAccess,
  verifyAndAuthorize,
  verifyAdmin,
} = require("../auth/auth");

const Cart = require("../models/Cart").Cart;
const Product = require("../models/Product").Product;
const User = require("../models/User").User;

//CREATE

router.post("/", verifyAccess, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyAccess, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyAccess, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ status: "success", message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user cart
router.get("/:id", verifyAccess, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
