import db from '../../db/connection.js';
import { z } from "zod";

const ThemeSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
});

const themes = [];

let currentId = 1;

const ThemesController = {
  create(req, res) {
    try {
      const data = ThemeSchema.parse(req.body);
      const newTheme = { id: currentId++, ...data };
      themes.push(newTheme);
      res.status(201).json({ message: "Tema criado", theme: newTheme });
    } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Erro interno' });
    }
  },

  getAll(req, res) {
    res.json(themes);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    const theme = themes.find(t => t.id === id);
    if (!theme) return res.status(404).json({ message: "Tema não encontrado" });
    res.json(theme);
  },

  update(req, res) {
    try {
      const id = Number(req.params.id);
      const themeIndex = themes.findIndex(t => t.id === id);
      if (themeIndex === -1) return res.status(404).json({ message: "Tema não encontrado" });

      const data = ThemeSchema.parse(req.body);

      themes[themeIndex] = { id, ...data };
      res.json({ message: "Tema atualizado", theme: themes[themeIndex] });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  }
};

export default ThemesController;
