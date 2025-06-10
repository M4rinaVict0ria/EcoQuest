import db from '../../db/connection.js';
import { z } from "zod";

const StoreItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  cost: z.number()
});

const storeItems = [];
let nextItemId = 1; // Inicia o contador do ID

const StoreController = {
  create(req, res) {
    try {
      const data = StoreItemSchema.parse(req.body);
      const newItem = { id: nextItemId++, ...data }; // Usando o contador sequencial para o ID
      storeItems.push(newItem);
      res.status(201).json({ message: "Item da loja criado", item: newItem });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },
  getAll(req, res) {
    res.json(storeItems);
  },

  getById(req, res) {
    const id = Number(req.params.id);
    const item = storeItems.find(item => item.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item não encontrado" });
    }
  },

  delete(req, res) {
    const id = Number(req.params.id);
    const index = storeItems.findIndex(item => item.id === id);
    if (index !== -1) {
      storeItems.splice(index, 1);
      return res.json({ message: "Item da loja removido" });
    }
    res.status(404).json({ message: "Item não encontrado" });
  }
};

export default StoreController;
