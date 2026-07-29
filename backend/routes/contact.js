const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); // 🚀 Linked cleanly to your new controller

// 🌐 Exposing the contact transmission endpoint entry gate
router.post('/', contactController.submitContactForm);

module.exports = router;
