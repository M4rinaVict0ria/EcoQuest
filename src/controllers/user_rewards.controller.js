import { z } from "zod";

const UserRewardSchema = z.object({
  user_id: z.number(),
  reward_id: z.number(),
  // unlocked_at será gerado automaticamente, não precisa no corpo da requisição
});

const userRewards = [];
let nextUserRewardId = 1;

const UserRewardController = {
  create(req, res) {
    try {
      // Aqui vamos garantir que o user_id vem da URL, não do corpo
      const user_id = Number(req.params.user_id);
      if (isNaN(user_id)) {
        return res.status(400).json({ error: "user_id inválido" });
      }

      // Juntando user_id da URL com o reward_id do corpo
      const data = UserRewardSchema.parse({
        user_id,
        reward_id: req.body.reward_id,
      });

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
        unlocked_at: new Date().toISOString(),
      };

      userRewards.push(newReward);
      res.status(201).json({ message: "Recompensa desbloqueada", reward: newReward });
    } catch (error) {
      // O erro de validação do Zod fica em error.errors, outros erros em error.message
      res.status(400).json({ error: error.errors || error.message });
    }
  },

  getAll(req, res) {
    res.json(userRewards);
  },

  delete(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "id inválido" });

    const index = userRewards.findIndex(r => r.id === id);
    if (index !== -1) {
      userRewards.splice(index, 1);
      return res.json({ message: "Recompensa removida" });
    }
    res.status(404).json({ message: "Recompensa não encontrada" });
  }
};

export default UserRewardController;
