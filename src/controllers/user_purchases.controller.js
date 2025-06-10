import db from '../../db/connection.js';
import { z } from "zod";

const PurchaseSchema = z.object({
  user_id: z.number(),
  item_id: z.number(),
  purchased_at: z.string().datetime().optional() // Agora opcional, o backend preenche
});

const purchases = [];
let nextPurchaseId = 1;

const PurchaseController = {
  create(req, res) {
    try {
      const data = PurchaseSchema.parse(req.body);
      const newPurchase = {
        id: nextPurchaseId++,
        ...data,
        purchased_at: new Date().toISOString() // Data atual gerada automaticamente
      };
      purchases.push(newPurchase);
      res.status(201).json({ message: "Compra registrada", purchase: newPurchase });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  getAll(req, res) {
    res.json(purchases);
  },

  delete(req, res) {
    const id = Number(req.params.id);
    const index = purchases.findIndex(p => p.id === id);
    if (index !== -1) {
      purchases.splice(index, 1);
      return res.json({ message: "Compra removida" });
    }
    res.status(404).json({ message: "Compra não encontrada" });
  }
};

export default PurchaseController;
