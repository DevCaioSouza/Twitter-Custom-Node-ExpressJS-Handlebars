import { Router } from 'express';

import InsightController from '../controllers/InsightController.js';

const router = Router();

//helper
import { checkAuth } from '../helpers/auth.js';

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
router.post('/dashboard', checkAuth, InsightController.updateDashboardInsight)

export default router;
