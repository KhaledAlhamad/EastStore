const express = require('express')
const router = express.Router();

const Product = require('../models/Product').Product;

// get all products 
router.get('/', async (req,res) => {
    const product = await Product.find({})

    product ? res.status(200).send(product) : res.status(400).send("No products available") 
})

router.post('/', async (req,res) => {
    const {name, quantity} = req.body;
    // console.log(quantity)

    const newProduct = await Product.create({name, quantity})
    if (newProduct) {
        res.status(201).json({
          _id: newProduct._id,
          name: newProduct.name,
          quantity: newProduct.quantity,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    // res.send(product)
})

router.delete('/:id', async (req,res) => {
    const deleteProduct = await Product.findById(req.params.id);
    console.log(deleteProduct)
    if(deleteProduct){
        await deleteProduct.remove();
        res.status(200).send({ status: "success", message: "Product Deleted Successfully" })
    } 
    res.status(400).send('Couldn NOT delete product');
})


module.exports = router;