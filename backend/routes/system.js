const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController'); // 🚀 Linked cleanly to your new controller

// GET /api/system/status
router.get('/status', systemController.getSystemStatus);

module.exports = router;
