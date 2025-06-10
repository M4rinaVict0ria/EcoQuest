import { z } from "zod";

const UserRewardSchema = z.object({
  user_id: z.number(),
  reward_id: z.number(),
  // removed unlocked_at from schema because we'll generate it automatically
});

const userRewards = [];
let nextUserRewardId = 1;

const UserRewardController = {
  create(req, res) {
    try {
      const data = UserRewardSchema.parse(req.body);

      // Verifica se já foi desbloqueada essa recompensa para esse usuário
      const alreadyUnlocked = userRewards.find(
        ur => ur.user_id === data.user_id && ur.reward_id === data.reward_id
      );
      if (alreadyUnlocked) {
        return res.status(400).json({ message: "Recompensa já desbloqueada para este usuário" });
      }

      const newReward = {
        id: nextUserRewardId++,
        ...data,
        unlocked_at: new Date().toISOString(), // data atual
      };

      userRewards.push(newReward);
      res.status(201).json({ message: "Recompensa desbloqueada", reward: newReward });
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  },

  getAll(req, res) {
    res.json(userRewards);
  },

  delete(req, res) {
    const id = Number(req.params.id);
    const index = userRewards.findIndex(r => r.id === id);
    if (index !== -1) {
      userRewards.splice(index, 1);
      return res.json({ message: "Recompensa removida" });
    }
    res.status(404).json({ message: "Recompensa não encontrada" });
  }
};

export default UserRewardController;
