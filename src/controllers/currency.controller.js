// src/controllers/currency.controller.js

import db from '../../db/connection.js';
import { z } from 'zod';

const currencySchema = z.object({
  eco_points: z.number().int().nonnegative().optional(),
  flora_coins: z.number().int().nonnegative().optional(),
});

class CurrencyController {
  static async getCurrency(req, res) {
    const { user_id } = req.params;

    try {
      const data = await db('user_profiles').where({ user_id }).first();

      if (!data) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const { eco_points = 0, flora_coins = 0 } = data;
      res.json({ eco_points, flora_coins });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar moedas', error });
    }
  }

  static async addCurrency(req, res) {
    const { user_id } = req.params;
    const parse = currencySchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({ message: 'Dados inválidos', errors: parse.error.errors });
    }

    const { eco_points = 0, flora_coins = 0 } = parse.data;

    try {
      await db('user_profiles')
        .where({ user_id })
        .increment({
          eco_points,
          flora_coins,
        });

      res.json({ message: 'Moedas adicionadas com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar moedas', error });
    }
  }

  static async spendCurrency(req, res) {
    const { user_id } = req.params;
    const parse = currencySchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({ message: 'Dados inválidos', errors: parse.error.errors });
    }

    const { eco_points = 0, flora_coins = 0 } = parse.data;

    try {
      const profile = await db('user_profiles').where({ user_id }).first();

      if (!profile) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (
        (eco_points > profile.eco_points) ||
        (flora_coins > profile.flora_coins)
      ) {
        return res.status(400).json({ message: 'Saldo insuficiente' });
      }

      await db('user_profiles')
        .where({ user_id })
        .decrement({
          eco_points,
          flora_coins,
        });

      res.json({ message: 'Moedas gastas com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao gastar moedas', error });
    }
  }
}

export default CurrencyController;
