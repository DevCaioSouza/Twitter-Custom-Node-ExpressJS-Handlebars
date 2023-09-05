const express = require('express');
const InsightController = require('../controllers/insightController');
const router = express.Router();

// controller

router.get('/', InsightController.showInsights);

module.exports = router;
