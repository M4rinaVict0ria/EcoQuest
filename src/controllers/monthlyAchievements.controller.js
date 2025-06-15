import db from '../../db/connection.js';

const MonthlyAchievementController = {
  async assignMonthlyAchievements(req, res) {
    try {
      // Busca a conquista mensal
      const monthlyAchievement = await db('achievements')
        .where('is_monthly', true)
        .first();

      if (!monthlyAchievement) {
        return res.status(404).json({ error: 'Conquista mensal não encontrada.' });
      }

      // Define intervalo do mês atual
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Busca usuários que completaram pelo menos 30 quests diárias no mês atual
      const usersWithCounts = await db('user_quests')
        .join('quests', 'user_quests.quest_id', 'quests.id')
        .select('user_quests.user_id')
        .count('user_quests.id as completedCount')
        .where('user_quests.completed', true)
        .andWhere('user_quests.completed_at', '>=', firstDay)
        .andWhere('user_quests.completed_at', '<=', lastDay)
        .andWhere('quests.type', 'daily')
        .groupBy('user_quests.user_id')
        .having('completedCount', '>=', 30);

      // Atribui a conquista para quem ainda não tem
      for (const user of usersWithCounts) {
        const alreadyHas = await db('user_achievements')
          .where({ user_id: user.user_id, achievement_id: monthlyAchievement.id })
          .first();

        if (!alreadyHas) {
          await db('user_achievements').insert({
            user_id: user.user_id,
            achievement_id: monthlyAchievement.id,
            assigned_at: new Date(),
          });
        }
      }

      res.status(200).json({ message: 'Conquistas mensais atribuídas aos usuários elegíveis.' });
    } catch (error) {
      console.error('Erro ao atribuir conquistas mensais:', error);
      res.status(500).json({ error: 'Erro interno ao atribuir conquistas mensais.' });
    }
  }
};

export default MonthlyAchievementController;
