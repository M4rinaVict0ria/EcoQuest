// src/routes/streak.routes.js

import express from 'express';
import StreakController from '../controllers/streak.controller.js';

const router = express.Router();

router.get('/users/:user_id/streak', StreakController.getStreak);
router.post('/users/:user_id/streak/increment', StreakController.incrementStreak);
router.post('/users/:user_id/streak/reset', StreakController.resetStreak);

export default router;
