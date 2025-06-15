import express from 'express';
import UserQuestController from '../controllers/user_quests.controller.js';

const router = express.Router();

router.get('/:user_id/quests', UserQuestController.getUserQuests);
router.post('/:quest_id/complete', UserQuestController.completeQuest);
router.put('/:id/progress', UserQuestController.updateProgress);

export default router;
