import knex from '../../db/connection.js';

const UserAchievementsController = {
  // Função que só executa a lógica, sem req/res
  async assignMonthlyAchievementLogic() {
    const monthlyAchievement = await knex('achievements')
      .where('type', 'monthly')
      .first();

    if (!monthlyAchievement) {
      throw new Error('Conquista mensal não encontrada.');
    }

    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentYear = String(now.getFullYear());

    const eligibleUsers = await knex('user_quests')
      .join('quests', 'user_quests.quest_id', 'quests.id')
      .where('quests.type', 'daily')
      .whereNotNull('user_quests.completed_at')
      .andWhereRaw('strftime("%m", user_quests.completed_at) = ?', [currentMonth])
      .andWhereRaw('strftime("%Y", user_quests.completed_at) = ?', [currentYear])
      .select('user_quests.user_id')
      .groupBy('user_quests.user_id')
      .havingRaw('COUNT(*) >= 30');

    const assignedAt = new Date();

    await Promise.all(
      eligibleUsers.map(async (user) => {
        const exists = await knex('user_achievements')
          .where({ user_id: user.user_id, achievement_id: monthlyAchievement.id })
          .first();

        if (!exists) {
          await knex('user_achievements').insert({
            user_id: user.user_id,
            achievement_id: monthlyAchievement.id,
            assigned_at: assignedAt,
          });
        }
      })
    );

    return 'Conquista mensal atribuída com sucesso.';
  },

  // Handler para rota Express
  async assignMonthlyAchievement(req, res) {
    try {
      const message = await UserAchievementsController.assignMonthlyAchievementLogic();
      res.status(200).json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

export default UserAchievementsController;
