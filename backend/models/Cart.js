const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref : 'User' //relation betwen the cart and the user
    // },
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref : 'Product' //relation betwen the cart and the user
    // }

    userId:{
        type: String,
        required:true,
    },
    // productId:{
    //     type:String,
    //     required:true
    // }
    product: [{
        name:{
            type: String,
            required: [true, 'product name should be provided'],
        },
        image:{
            type: String,
            required: [true, 'product image should be provided'],
        },
        quantity: {
            type: Number,
            required: [true, 'quantity should be provided'],
        },
        category: {
            type: String
        },
        color: {
           type: String
        },
        price: {
            type : Number,
            required: true,
            default: 0
        },
        description:{
            type : String,
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Cart}