import express from "express";
import QuestController from "../controllers/quest.controller.js";

const router = express.Router();

router.get("/", QuestController.getAll);
router.get("/:id", QuestController.getById);
router.post("/", QuestController.create);

export default router;
