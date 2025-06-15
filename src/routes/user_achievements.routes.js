import express from 'express';
import UserAchievementsController from '../controllers/user_achievements.controller.js';

const router = express.Router();

// Atribuir conquista mensal automaticamente para os usuários elegíveis
router.post('/assign-monthly', UserAchievementsController.assignMonthlyAchievement);

export default router;
