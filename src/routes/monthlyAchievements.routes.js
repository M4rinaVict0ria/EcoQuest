// routes/monthlyAchievements.routes.js
import express from 'express';
import MonthlyAchievementsController from '../controllers/monthlyAchievements.controller.js';

const router = express.Router();

// Correção aqui: só coloque "/assign-monthly"
router.post('/assign-monthly', MonthlyAchievementsController.assignMonthlyAchievements);

export default router;
