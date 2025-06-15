import db from '../../db/connection.js';
import { z } from 'zod';

const privacySchema = z.object({
  is_private: z.boolean(),
});

class PrivacySettingsController {
  static async getPrivacy(req, res) {
    const userId = Number(req.params.user_id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    try {
      const profile = await db('user_profiles').where({ user_id: userId }).first();

      if (!profile) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json({ is_private: profile.is_private });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar privacidade', error });
    }
  }

  static async updatePrivacy(req, res) {
    const userId = Number(req.params.user_id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    try {
      const data = privacySchema.parse(req.body);

      const updated = await db('user_profiles').where({ user_id: userId }).update(data);

      if (updated === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado para atualizar privacidade' });
      }

      res.json({ message: 'Privacidade atualizada com sucesso' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
      }
      res.status(500).json({ message: 'Erro ao atualizar privacidade', error });
    }
  }
}

export default PrivacySettingsController;
