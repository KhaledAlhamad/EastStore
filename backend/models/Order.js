const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref : 'User' //relation betwen the order and the user
    // },
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref : 'Product' //relation betwen the order and the user
    // }

    userId:{
        type: String,
        required:true,
    },
    // productId:{
    //     type:String,
    //     required:true
    // }
    product: []
})

const Order = mongoose.model('Order', orderSchema);

module.exports = {Order}