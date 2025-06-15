// src/routes/streak.routes.js

import express from 'express';
import StreakController from '../controllers/streak.controller.js';

const router = express.Router();

router.get('/:user_id', StreakController.getStreak);
router.post('/:user_id/increment', StreakController.incrementStreak);
router.post('/:user_id/reset', StreakController.resetStreak);


export default router;
