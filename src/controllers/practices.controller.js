import db from '../../db/connection.js';
import { z } from "zod";

const PracticeSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  xp_reward: z.number().int().min(1),
  theme_id: z.number().int().min(1),
});

const practices = [];

let currentId = 1;

const PracticesController = {
  create(req, res) {
    try {
      const data = PracticeSchema.parse(req.body);
      const newPractice = { id: currentId++, ...data };
      practices.push(newPractice);
      res.status(201).json({ message: "Prática criada", practice: newPractice });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  getAllByTheme(req, res) {
    const themeId = Number(req.params.theme_id);
    const filteredPractices = practices.filter(p => p.theme_id === themeId);
    res.json(filteredPractices);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    const practice = practices.find(p => p.id === id);
    if (!practice) return res.status(404).json({ message: "Prática não encontrada" });
    res.json(practice);
  },

    update(req, res) {
    try {
      const id = Number(req.params.id);
      const practiceIndex = practices.findIndex(p => p.id === id);
      if (practiceIndex === -1) return res.status(404).json({ message: "Prática não encontrada" });

      const data = PracticeSchema.partial().parse(req.body); // atualização parcial

      practices[practiceIndex] = { ...practices[practiceIndex], ...data };
      res.json({ message: "Prática atualizada", practice: practices[practiceIndex] });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  }
};

export default PracticesController;
