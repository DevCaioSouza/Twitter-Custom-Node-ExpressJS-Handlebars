const express = require('express');
const InsightController = require('../controllers/InsightController');
const router = express.Router();

//helper
const checkAuth = require('../helpers/auth').checkAuth;

// controller

//mostra os insights do usuário logado
router.get('/dashboard', checkAuth, InsightController.dashboard);

//mostra todos insights
router.get('/', InsightController.showInsights);

//redireciona para a página de criar insight
router.get('/create', checkAuth, InsightController.createInsight);

//adiciona um insight no banco de dados
router.post('/create', checkAuth, InsightController.insightPost);

//deleta o insight selecionado
router.post('/remove', checkAuth, InsightController.removeInsight);

module.exports = router;
