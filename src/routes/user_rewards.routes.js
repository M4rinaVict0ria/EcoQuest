import express from "express";
import UserRewardController from "../controllers/user_rewards.controller.js";

const router = express.Router();

router.post("/users/:user_id/rewards", UserRewardController.create);
router.get("/user-rewards/unlock", UserRewardController.getAll);
router.delete("/user_rewards/:id", UserRewardController.delete);

export default router;