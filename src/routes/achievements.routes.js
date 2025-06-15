// routes/achievements.routes.js
import express from "express";
import AchievementsController from "../controllers/achievements.controller.js";

const router = express.Router();

router.get("/", AchievementsController.getAll);
router.get("/:id", AchievementsController.getById);
router.post("/", AchievementsController.create);
router.put("/:id", AchievementsController.update);
router.delete("/:id", AchievementsController.delete);

export default router;
