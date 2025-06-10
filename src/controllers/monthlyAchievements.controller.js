import db from '../../db/connection.js';

const MonthlyAchievementController = {
  async assignMonthlyAchievements(req, res) {
    try {
      // Busca a conquista mensal (type = 'monthly')
      const monthlyAchievement = await db('achievements')
        .where('type', 'monthly')
        .first();

      if (!monthlyAchievement) {
        return res.status(404).json({ error: 'Conquista mensal não encontrada.' });
      }

      // Define intervalo do mês atual
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Busca todos usuários que completaram quests diárias no mês atual,
      // conta quantas quests diárias completaram por usuário
      const usersWithCounts = await db('user_quests')
        .select('user_id')
        .count('id as completedCount')
        .where('completed_at', '>=', firstDay)
        .andWhere('completed_at', '<=', lastDay)
        .andWhere('type', 'daily') // considera só quests diárias
        .groupBy('user_id')
        .having('completedCount', '>=', 30);

      // Atribui a conquista mensal para usuários que ainda não receberam
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
