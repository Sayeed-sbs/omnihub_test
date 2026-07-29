const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 🌐 Exposing external API node entrypoints
router.post('/register', authController.register);
router.post('/login', authController.login);

// 🔒 Added: Missing requirement path to securely clear httpOnly token cookies on logout
router.post('/logout', authController.logout);

module.exports = router;
