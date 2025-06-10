// src/controllers/achievements.controller.js
import { z } from "zod";

const AchievementSchema = z.object({
  user_id: z.number(),
  title: z.string(),
  description: z.string(),
  month: z.string(),
});

let achievements = [];
let nextId = 1;

const AchievementsController = {
  // Listar todas conquistas
  getAll(req, res) {
    res.json(achievements);
  },

  // Ver detalhes de uma conquista por ID
  getById(req, res) {
    const id = Number(req.params.id);
    const achievement = achievements.find((a) => a.id === id);
    if (!achievement) {
      return res.status(404).json({ message: "Conquista não encontrada" });
    }
    res.json(achievement);
  },

  // Criar nova conquista
  create(req, res) {
    try {
      const data = AchievementSchema.parse(req.body);
      const newAchievement = { id: nextId++, ...data };
      achievements.push(newAchievement);
      res.status(201).json(newAchievement);
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  // Atualizar conquista por ID
  update(req, res) {
    const id = Number(req.params.id);
    const index = achievements.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Conquista não encontrada" });
    }

    try {
      const data = AchievementSchema.partial().parse(req.body); // permite atualizar parcialmente
      achievements[index] = { ...achievements[index], ...data };
      res.json(achievements[index]);
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  // Remover conquista por ID
  delete(req, res) {
    const id = Number(req.params.id);
    const index = achievements.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Conquista não encontrada" });
    }
    achievements.splice(index, 1);
    res.json({ message: "Conquista removida com sucesso" });
  },
};

export default AchievementsController;
