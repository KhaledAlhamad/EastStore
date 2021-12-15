const express = require("express");
const router = express.Router();

const Order = require("../models/order").Order;
const Product = require("../models/Product").Product;
const User = require("../models/User").User;

//get user orders
router.get("/:id", async (req, res) => {
  Order.find({ userId: req.params.id }, (err, orders) => {
    res.send(orders);
  });
});

// add product
router.post("/", (req, res) => {
  const { userId, product } = req.body;
  // const uid = req.body.userId;
  Order.find({ userId: userId }, (err, users) => {
    if (users.length) {
        Order.updateOne({ userId: userId}, { $push: { product: { $each: product } } } , (err, orders) => {
            orders ? res.status(200).send({ status: "exist", message: "Product added Successfully" }) : res.send("Error");
          });
        // res.send("Exist")
    } else {
        Order.create({ userId: userId, product: product }, (err, orders) => {
            orders ? res.status(200).send({ status: "new", message: "Product added Successfully" }) : res.send("Error");
          });
    // res.send("NOT")
    }
  });

  // console.log(uid)
});

router.delete("/", (req, res) => {
  const { userId, productId } = req.body;
  Order.findOneAndDelete({ userId, productId }, async (err, product) => {
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
