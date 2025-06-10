// src/controllers/achievements.controller.js
import db from '../../db/connection.js';
import { z } from 'zod';

// Schema para validar input (sem id, created_at, updated_at)
const AchievementSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  is_monthly: z.boolean().optional().default(false),
});

class AchievementsController {
  static async create(req, res) {
    try {
      const data = AchievementSchema.parse(req.body);
      const [id] = await db('achievements').insert(data).returning('id');
      const achievement = await db('achievements').where({ id }).first();
      res.status(201).json({ message: 'Conquista criada', achievement });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ message: 'Erro ao criar conquista', error: error.message });
      }
    }
  }

  static async getAll(req, res) {
    try {
      const achievements = await db('achievements').select();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar conquistas', error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const achievement = await db('achievements').where({ id }).first();
      if (!achievement) {
        return res.status(404).json({ message: 'Conquista não encontrada' });
      }
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar conquista', error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      const data = AchievementSchema.partial().parse(req.body); // permite atualização parcial

      const updated = await db('achievements').where({ id }).update({
        ...data,
        updated_at: new Date(),
      });

      if (!updated) {
        return res.status(404).json({ message: 'Conquista não encontrada' });
      }

      const achievement = await db('achievements').where({ id }).first();
      res.json({ message: 'Conquista atualizada', achievement });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ message: 'Erro ao atualizar conquista', error: error.message });
      }
    }
  }

  static async delete(req, res) {
    try {
      const id = Number(req.params.id);
      const deleted = await db('achievements').where({ id }).del();
      if (!deleted) {
        return res.status(404).json({ message: 'Conquista não encontrada' });
      }
      res.json({ message: 'Conquista removida' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover conquista', error: error.message });
    }
  }
}

export default AchievementsController;
