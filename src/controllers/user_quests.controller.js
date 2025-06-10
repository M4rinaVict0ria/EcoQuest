import db from '../../db/connection.js';
import { z } from 'zod';

const completeQuestSchema = z.object({
  user_id: z.number(),
  dateCompleted: z.string().datetime().optional(),
});

const updateProgressSchema = z.object({
  progress: z.number().min(0).max(100),
});

const UserQuestController = {
  async getUserQuests(req, res) {
    const userId = Number(req.params.user_id);
    if (isNaN(userId)) return res.status(400).json({ error: 'user_id inválido' });

    try {
      const quests = await db('user_quests')
        .where('user_id', userId)
        .select('id', 'quest_id', 'completed', 'completed_at', 'progress');

      res.json(quests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar quests do usuário' });
    }
  },

  async completeQuest(req, res) {
    try {
      const questId = Number(req.params.quest_id);
      if (isNaN(questId)) return res.status(400).json({ error: 'quest_id inválido' });

      const parseResult = completeQuestSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: 'Dados inválidos', details: parseResult.error.errors });
      }
      const { user_id, dateCompleted } = parseResult.data;

      // Verifica se já existe quest concluída para esse user e quest
      const existing = await db('user_quests')
        .where({ user_id, quest_id: questId })
        .whereNotNull('completed_at')
        .first();

      if (existing) {
        return res.status(409).json({ message: 'Quest já concluída por esse usuário' });
      }

      // Insere nova quest concluída
      const [insertedId] = await db('user_quests').insert({
        user_id,
        quest_id: questId,
        completed: true,
        completed_at: dateCompleted || new Date().toISOString(),
        progress: 100,
      });

      res.status(201).json({ message: "Quest marcada como concluída", userQuestId: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao marcar quest como concluída' });
    }
  },

  async updateProgress(req, res) {
    try {
      const userQuestId = Number(req.params.id);
      if (isNaN(userQuestId)) return res.status(400).json({ error: 'id inválido' });

      const parseResult = updateProgressSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: 'Dados inválidos', details: parseResult.error.errors });
      }

      const userQuest = await db('user_quests').where('id', userQuestId).first();

      if (!userQuest) {
        return res.status(404).json({ message: "Quest do usuário não encontrada" });
      }

      await db('user_quests').where('id', userQuestId).update({ progress: parseResult.data.progress });

      res.json({ message: "Progresso atualizado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar progresso' });
    }
  }
};

export default UserQuestController;
