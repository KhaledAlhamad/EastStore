const express = require('express')
const router = express.Router();

const Product = require('../models/Product').Product;

// get all products 
router.get('/', async (req,res) => {
    Product.find({} , (err,products) => {
      if(products.length){
        res.status(200).send(products)
      } else{
        res.status(400).send("No products available")
      }  
    });
})

//get specific product
router.get('/:id', async (req,res) => {
  const id = req.params.id;
  Product.find({} , (err,products) => {
    if(products){
      Product.find({_id : id} , (err,products) => {
        if(products){
          res.status(200).send(products)
        } else{
          res.status(400).send("Product NOT found")
        }  
      });
    } else{
      res.status(400).send("No products available")
    }  
  });

  
})

//Add product
router.post('/', async (req,res) => {
    const {name, image, quantity, category , color} = req.body;
    // console.log(quantity)

    const newProduct = await Product.create({name, image, quantity, category , color})
    if (newProduct) {
        res.status(201).json({
          _id: newProduct._id,
          name: newProduct.name,
          image: newProduct.image,
          quantity: newProduct.quantity,
          category: newProduct.category,
          color: newProduct.color
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    // res.send(product)
})

//Delete specific product
router.delete('/:id', async (req,res) => {
    Product.findOneAndDelete({_id : req.params.id} , async (err,product) => {
      if(product){
        res.status(200).send({ status: "success", message: "Product Deleted Successfully" })
      } else{
        res.status(400).send("Couldn NOT delete product")
      }  
    });
})

//update product
router.put('/:name', (req,res) => {
  const name = req.params.name;

  Product.updateOne(
    { name: name },
    {
      name: req.body.name,
      image: req.body.pages,
      quantity: req.body.image,
      category: req.body.image,
      color: req.body.image
    },
    (err, Products) => {
      if (err) {
        console.log(err);
      }
      Products.modifiedCount == 0
        ? res.status(400).send("Product NOT found")
        : res.status(200).send("Product updated");
    }
  );
})


module.exports = router;