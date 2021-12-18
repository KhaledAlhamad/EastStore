const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart").Cart;
const Product = require("../models/Product").Product;
const User = require("../models/User").User;

//get user cart
router.get("/:id", async (req, res) => {
  Cart.find({ userId: req.params.id }, (err, cart) => {
    res.send(cart);
  });
});

// add product
router.post("/", (req, res) => {
  const { userId, product } = req.body;
  // const uid = req.body.userId;
  Cart.find({ userId: userId }, (err, users) => {
    if (users.length) {
        Cart.updateOne({ userId: userId}, { $push: { product: { $each: product } } } , (err, cart) => {
            cart ? res.status(200).send({ status: "exist", message: "Product added Successfully" }) : res.send("Error");
          });
        // res.send("Exist")
    } else {
        Cart.create({ userId: userId, product: product }, (err, cart) => {
            cart ? res.status(200).send({ status: "new", message: "Product added Successfully" }) : res.send("Error");
          });
    // res.send("NOT")
    }
  });

  // console.log(uid)
});

router.delete("/", (req, res) => {
  const { userId, productId } = req.body;
  Cart.findOneAndDelete({ userId, productId }, async (err, product) => {
    if (product) {
      res
        .status(200)
        .send({ status: "success", message: "Product Deleted Successfully" });
    } else {
      res.status(400).send("Couldn NOT delete product");
    }
  });
});
module.exports = router;
