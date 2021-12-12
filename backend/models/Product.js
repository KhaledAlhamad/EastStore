const mongoose = require('mongoose');


 const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'product name should be provided'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity should be provided'],
    },
    category: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product}