import db from '../../db/connection.js';
import { z } from "zod";

const ProgressSchema = z.object({
  user_id: z.number().int().min(1),
  practice_id: z.number().int().min(1),
  completed_at: z.string().optional(), // pode ser data em string, ou deixar o backend definir
});

const progressRecords = [];
let currentId = 1;

const ProgressController = {
  // Listar progresso do usuário
  getUserProgress(req, res) {
    const userId = Number(req.params.user_id);
    const userProgress = progressRecords.filter(p => p.user_id === userId);
    res.json(userProgress);
  },

  // Marcar prática como concluída
  create(req, res) {
    try {
      const data = ProgressSchema.parse(req.body);

      const newProgress = {
        id: currentId++,
        ...data,
        completed_at: data.completed_at || new Date().toISOString()
      };

      progressRecords.push(newProgress);

      res.status(201).json({ message: "Prática marcada como concluída", progress: newProgress });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  // Detalhar progresso individual
  getById(req, res) {
    const id = Number(req.params.id);
    const progress = progressRecords.find(p => p.id === id);
    if (!progress) return res.status(404).json({ message: "Progresso não encontrado" });
    res.json(progress);
  }
};

export default ProgressController;
