import db from '../../db/connection.js';
import { z } from "zod";

const QuestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  xp_bonus: z.number().int().min(0),
  status: z.string().min(1) // Ex: "ativa", "inativa"
});

const quests = [];
let nextQuestId = 1;

const QuestController = {
  create(req, res) {
    try {
      const data = QuestSchema.parse(req.body);
      const newQuest = { id: nextQuestId++, ...data };
      quests.push(newQuest);
      res.status(201).json({ message: "Missão adicionada", quest: newQuest });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  getAll(req, res) {
    // Filtrar apenas quests com status 'ativa'
    const activeQuests = quests.filter(q => q.status.toLowerCase() === 'ativa');
    res.json(activeQuests);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    const quest = quests.find(q => q.id === id);
    if (!quest) return res.status(404).json({ message: "Missão não encontrada" });
    res.json(quest);
  }
};

export default QuestController;
