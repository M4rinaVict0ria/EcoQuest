// routes/monthlyAchievements.routes.js
import express from 'express';
import MonthlyAchievementsController from '../controllers/monthlyAchievements.controller.js';

const router = express.Router();

// Endpoint para disparar a atribuição automática da conquista mensal
router.post('/user-achievements/assign-monthly', MonthlyAchievementsController.assignMonthlyAchievements);

export default router;
