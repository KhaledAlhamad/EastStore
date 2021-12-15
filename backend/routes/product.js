const express = require('express')
const router = express.Router();

const Product = require('../models/Product').Product;

// get all products 
router.get('/', async (req,res) => {
    const product = await Product.find({})

    product ? res.status(200).send(product) : res.status(400).send("No products available") 
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

//Delete product
router.delete('/:id', async (req,res) => {
    const deleteProduct = await Product.findById(req.params.id);
    console.log(deleteProduct)
    if(deleteProduct){
        await deleteProduct.remove();
        res.status(200).send({ status: "success", message: "Product Deleted Successfully" })
    } 
    res.status(400).send('Couldn NOT delete product');
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
      // console.log("updated Book", Books);
      // res.send("Book updated");
      // mongoose.connection.close();
    }
  );
})

module.exports = router;