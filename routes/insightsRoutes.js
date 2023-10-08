const express = require('express');
const InsightController = require('../controllers/InsightController');
const router = express.Router();

//helper
const checkAuth = require('../helpers/auth').checkAuth;

// controller

router.get('/dashboard', checkAuth, InsightController.dashboard);
router.get('/', InsightController.showInsights);

module.exports = router;
