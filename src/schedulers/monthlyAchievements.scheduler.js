import cron from 'node-cron';
import UserAchievementsController from '../controllers/user_achievements.controller.js';

const scheduleMonthlyAchievements = () => {
  cron.schedule('0 0 1 * *', async () => {
    console.log('Iniciando atribuição automática de conquistas mensais...');
    try {
      await UserAchievementsController.assignMonthlyAchievementLogic();
      console.log('Conquistas mensais atribuídas com sucesso!');
    } catch (error) {
      console.error('Erro ao atribuir conquistas mensais:', error);
    }
  }, {
    timezone: 'America/Sao_Paulo',
  });
};

export default scheduleMonthlyAchievements;
