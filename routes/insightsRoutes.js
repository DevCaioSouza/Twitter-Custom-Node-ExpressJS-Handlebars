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

//editando os insights
router.get('/edit/:id', checkAuth, InsightController.editInsight)

//atualizando a dashboard com o insight editado
router.post('/dashboard', checkAuth, InsightController.updateDashboardInsight) // precisamos passar uma req POST para o dashboard, pq estamos enviando dados

module.exports = router;
