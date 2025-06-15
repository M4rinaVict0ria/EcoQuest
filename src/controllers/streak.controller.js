import db from '../../db/connection.js';

class StreakController {
  static async getStreak(req, res) {
    const { user_id } = req.params;

    try {
      const profile = await db('user_profiles').where({ user_id }).first();

      if (!profile) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json({ streak: profile.current_streak || 0 });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar streak', error });
    }
  }

  static async incrementStreak(req, res) {
    const { user_id } = req.params;
    try {
      // Incrementa o streak (retorna número de linhas afetadas)
      const rowsUpdated = await db('user_profiles')
        .where({ user_id })
        .increment('current_streak', 1);

      if (rowsUpdated === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Busca o valor atualizado do streak
      const updatedProfile = await db('user_profiles')
        .where({ user_id })
        .first();

      res.json({ message: 'Streak incrementado', streak: updatedProfile.current_streak });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao incrementar streak', error });
    }
  }

  static async resetStreak(req, res) {
    const { user_id } = req.params;

    try {
      const rowsUpdated = await db('user_profiles')
        .where({ user_id })
        .update({ current_streak: 0 });

      if (rowsUpdated === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json({ message: 'Streak resetado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao resetar streak', error });
    }
  }
}

export default StreakController;
