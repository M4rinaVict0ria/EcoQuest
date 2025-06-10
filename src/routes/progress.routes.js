import express from "express";
import ProgressController from "../controllers/progress.controller.js";

const router = express.Router();

router.get("/users/:user_id/progress", ProgressController.getUserProgress);

router.post("/progress", ProgressController.create);

router.get("/progress/:id", ProgressController.getById);

export default router;
