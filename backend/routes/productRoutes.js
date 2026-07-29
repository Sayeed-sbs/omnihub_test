const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // 🚀 Linked cleanly to your new controller

// 🌐 Exposing external API catalog matrix nodes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
