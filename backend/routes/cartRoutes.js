const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware'); // 🔒 Imported the authentication middleware lock

// 🛡️ All endpoints are now securely guarded by httpOnly session token checkpoints
router.get('/', protect, cartController.getCart);
router.post('/add', protect, cartController.addToCart);
router.post('/update', protect, cartController.updateQuantity);
router.post('/remove', protect, cartController.removeFromCart);
router.post('/clear', protect, cartController.clearCart); // 🚀 Fixed: Moved cleanly inside export module parameters

module.exports = router;
