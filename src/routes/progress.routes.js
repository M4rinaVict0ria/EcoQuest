import express from "express";
import ProgressController from "../controllers/progress.controller.js";

const router = express.Router();

router.get("/users/:user_id", ProgressController.getUserProgress); // fica /progress/users/:user_id
router.post("/", ProgressController.create);                      // fica /progress/
router.get("/:id", ProgressController.getById);                   // fica /progress/:id

export default router;
