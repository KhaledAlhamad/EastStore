const express = require("express");
const router = express.Router();
const {
  generateAccessToken,
  verifyAccess,
  verifyAndAuthorize,
  verifyAdmin,
} = require("../auth/auth");

const Product = require("../models/Product").Product;

//get specific product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Product.find({}, (err, products) => {
    if (products) {
      Product.find({ _id: id }, (err, products) => {
        if (products) {
          res.status(200).send(products);
        } else {
          res.status(400).send("Product NOT found");
        }
      });
    } else {
      res.status(400).send("No products available");
    }
  });
});

//Delete specific product
router.delete("/:id", verifyAdmin, async (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, async (err, product) => {
    if (product) {
      res
        .status(200)
        .send({ status: "success", message: "Product Deleted Successfully" });
    } else {
      res.status(400).send("Couldn NOT delete product");
    }
  });
});

//ADD Product
router.post("/", verifyAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Product
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET all products
router.get("/", async (req, res) => {
  const latest = req.query.latest;
  const cat = req.query.category;
  try {
    let products;

    if (latest) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (cat) {
      products = await Product.find({
        category: {
          $in: [cat],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
