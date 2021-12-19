const mongoose = require('mongoose');


 const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'product name should be provided'],
        unique: true
    },
    image:{
        type: String,
        required: [true, 'product image should be provided'],
    },
    size: {
        type: String,
    },
    category: {
        type: Array
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
},
{timestamps:true}
);

const Product = mongoose.model('Product', productSchema);

module.exports = {Product}