// src/controllers/user_profiles.controller.js

import db from '../../db/connection.js';
import { z } from 'zod';

const profileUpdateSchema = z.object({
  profile_picture: z.string().url().optional(),
  banner: z.string().url().optional(),
  profile_color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, 'Deve ser um código hex de cor').optional(),
  insignia: z.string().optional(),
  level: z.number().int().nonnegative().optional(),
  level_progress: z.number().min(0).max(1).optional(),
  max_streak_days: z.number().int().nonnegative().optional(),
  eco_points: z.number().int().nonnegative().optional(),
  flora_coins: z.number().int().nonnegative().optional(),
  is_private: z.boolean().optional(), // 👈 adicionado aqui
});

class UserProfilesController {
  static async getProfile(req, res) {
    const { user_id } = req.params;
    try {
      const profile = await db('user_profiles').where({ user_id }).first();

      if (!profile) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar perfil', error });
    }
  }

  static async updateProfile(req, res) {
    const { user_id } = req.params;
    const parseResult = profileUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ message: 'Dados inválidos', errors: parseResult.error.errors });
    }

    try {
      const updated = await db('user_profiles')
        .where({ user_id })
        .update({ ...parseResult.data, updated_at: new Date() });

      if (!updated) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
      }

      res.json({ message: 'Perfil atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar perfil', error });
    }
  }
}

export default UserProfilesController;
