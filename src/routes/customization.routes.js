import express from "express";
import AchievementsController from "../controllers/achievements.controller.js";

const router = express.Router();

router.get("/achievements", AchievementsController.getAll);
router.get("/achievements/:id", AchievementsController.getById);
router.post("/achievements", AchievementsController.create);
router.put("/achievements/:id", AchievementsController.update);
router.delete("/achievements/:id", AchievementsController.delete);

export default router;
