import { z } from "zod";

// Validação com Zod
const InsigniaSchema = z.object({
  name: z.string(),
  description: z.string(),
  unlocked_at: z.string().datetime(),
  user_id: z.number().optional() // opcional aqui, pois pode ser insígnia global
});

let insignias = [];
let nextId = 1;

const InsigniaController = {
  getAll(req, res) {
    res.json(insignias);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    const insignia = insignias.find(ins => ins.id === id);
    if (!insignia) {
      return res.status(404).json({ message: "Insígnia não encontrada" });
    }
    res.json(insignia);
  },

  create(req, res) {
    try {
      const data = InsigniaSchema.parse(req.body);
      const newInsignia = { id: nextId++, ...data };
      insignias.push(newInsignia);
      res.status(201).json({ message: "Insígnia criada", insignia: newInsignia });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  update(req, res) {
    const id = Number(req.params.id);
    const index = insignias.findIndex(ins => ins.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Insígnia não encontrada" });
    }

    try {
      const data = InsigniaSchema.parse(req.body);
      const updated = { ...insignias[index], ...data };
      insignias[index] = updated;
      res.json({ message: "Insígnia atualizada", insignia: updated });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  delete(req, res) {
    const id = Number(req.params.id);
    const index = insignias.findIndex(ins => ins.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Insígnia não encontrada" });
    }

    insignias.splice(index, 1);
    res.json({ message: "Insígnia removida com sucesso" });
  }
};

export default InsigniaController;
