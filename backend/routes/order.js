const express = require('express')
const router = express.Router();

const Order = require('../models/order').Order;
const Product = require('../models/Product').Product;
const User = require('../models/User').User;

router.get('/:id', async (req,res) => {
    Order.find({userId: req.params.id} , (err,orders) => {
        res.send(orders)
    })
})

router.post('/', (req,res) => {
    const {userId, productId} = req.body;

    // Order.create({uid, product}, (err,orders) => {
    //     orders ? res.send("Order added") : res.send("Error")
    // })

    // const prodId = req.body.productId;
    // Product.findById(prodId)
    //     .then(product => {
    //         console.log('product', product)
    //         return User.findById(mongoose.Types.ObjectId(req.user.userId))
    //             .then(user => {
    //                 console.log('postaddtoshoppingcart', user)
    //                 return user.addToShoppingCart(product)
    //             })
    //     })
    //     .then(result => {
    //         console.log('result', result)
    //         res.status(200).json({ result: result, message: 'Product is added to the shopping cart.' })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    const uid = req.body.userId;
    // const user = User.findById(uid)
    // User.find({_id : req.body.userId} , async (err,user) => {
    //     if(user){
    //       res.status(200).send(user)
    //     } else{
    //       res.status(400).send("Couldn NOT find user")
    //     }  
    //   });
    // Product.find({_id : req.body.productId} , async (err,product) => {
    //     if(product){
    //       res.status(200).send(product)
    //     } else{
    //       res.status(400).send("Couldn NOT find user")
    //     }  
    //   });

    Order.create({userId: userId, productId:productId}, (err,orders) => {
        orders ? res.send(orders) : res.send("Error")
    })
      
    console.log(uid)
})

// router.get('/:uid', (req,res) => {
    
// })
module.exports = router