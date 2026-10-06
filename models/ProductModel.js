const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required']
    },
    image: [{
        type: String,
        default: null
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;