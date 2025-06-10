import express from "express";
import RewardController from "../controllers/rewards.controller.js";

const router = express.Router();

router.post("/", RewardController.create);
router.get("/", RewardController.getAll);

export default router;
