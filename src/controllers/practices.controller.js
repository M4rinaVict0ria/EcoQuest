import { z } from "zod";

const PracticeSchema = z.object({
  title: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter ao menos 10 caracteres"),
  xp_reward: z.number().int().min(1, "XP deve ser no mínimo 1"),
  theme_id: z.number().int().min(1, "Tema inválido"),
});

const practices = [];
let currentId = 1;

const PracticesController = {
  create(req, res) {
    try {
      const data = PracticeSchema.parse(req.body);
      const newPractice = { id: currentId++, ...data };
      practices.push(newPractice);
      return res.status(201).json({ message: "Prática criada", practice: newPractice });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Erro de validação", errors: error.errors });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  },

  getAllByTheme(req, res) {
    const themeId = Number(req.params.theme_id);
    if (isNaN(themeId)) {
      return res.status(400).json({ message: "ID do tema inválido" });
    }
    const filteredPractices = practices.filter(p => p.theme_id === themeId);
    return res.json(filteredPractices);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const practice = practices.find(p => p.id === id);
    if (!practice) {
      return res.status(404).json({ message: "Prática não encontrada" });
    }
    return res.json(practice);
  },

  update(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const index = practices.findIndex(p => p.id === id);
      if (index === -1) {
        return res.status(404).json({ message: "Prática não encontrada" });
      }

      const data = PracticeSchema.partial().parse(req.body);
      practices[index] = { ...practices[index], ...data };
      return res.json({ message: "Prática atualizada", practice: practices[index] });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Erro de validação", errors: error.errors });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

export default PracticesController;
