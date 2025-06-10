import db from '../../db/connection.js';
import { z } from 'zod';

const RewardSchema = z.object({
  name: z.string(),
  description: z.string(),
  cost: z.number()
});

const rewards = [];

let nextRewardId = 1;

const RewardController = {
  create(req, res) {
    try {
      const data = RewardSchema.parse(req.body);
      const newReward = { id: nextRewardId++, ...data };
      rewards.push(newReward);
      res.status(201).json({ message: "Recompensa criada", reward: newReward });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },
  
  getAll(req, res) {
    res.json(rewards);
  }
};

export default RewardController;
