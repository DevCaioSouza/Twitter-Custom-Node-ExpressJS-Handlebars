import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
const router = Router();

router.get('/login', AuthController.login);
router.post('/login', AuthController.validateLogin);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);
router.get('/logout', AuthController.logout);

export default router;
