import express from "express";
import QuestController from "../controllers/quest.controller.js";

const router = express.Router();

router.get("/quests", QuestController.getAll);
router.get("/quests/:id", QuestController.getById);
router.post("/quests", QuestController.create); // opcional, admin

export default router;
