import express from 'express';
import UserQuestController from '../controllers/user_quests.controller.js';

const router = express.Router();

// Ver quests de um usuário
router.get('/users/:user_id/quests', UserQuestController.getUserQuests);

// Marcar quest como concluída
router.post('/user-quests/:quest_id/complete', UserQuestController.completeQuest);

// Atualizar progresso da quest do usuário
router.put('/user-quests/:id/progress', UserQuestController.updateProgress);

export default router;
