import express from "express";
import UserRewardController from "../controllers/user_rewards.controller.js";

const router = express.Router();

router.post("/:user_id/rewards", UserRewardController.create);
router.get("/unlock", UserRewardController.getAll);                  // GET /api/user-rewards/unlock
router.delete("/:id", UserRewardController.delete);  

export default router;
