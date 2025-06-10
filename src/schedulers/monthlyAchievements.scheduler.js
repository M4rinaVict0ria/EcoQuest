import cron from 'node-cron';
import UserAchievementsController from '../controllers/user_achievements.controller.js';

// Agendar tarefa para rodar TODO DIA 1º de cada mês à meia-noite (00:00)
const scheduleMonthlyAchievements = () => {
  cron.schedule('0 0 1 * *', async () => {
    console.log('Iniciando atribuição automática de conquistas mensais...');

    try {
      // Chama função para atribuir conquistas mensais automaticamente (backend)
      await UserAchievementsController.assignMonthly();

      console.log('Conquistas mensais atribuídas com sucesso!');
    } catch (error) {
      console.error('Erro ao atribuir conquistas mensais:', error);
    }
  }, {
    timezone: 'America/Sao_Paulo' // Ajuste o fuso horário conforme necessário
  });
};

export default scheduleMonthlyAchievements;
