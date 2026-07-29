const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product pricing unit']
  },
  category: {
    type: String,
    required: [true, 'Please declare a system catalog category'],
    trim: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  description: {
    type: String,
    required: [true, 'Please write a localized asset item description data payload']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
