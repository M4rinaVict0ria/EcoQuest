import express from "express";
import InsigniaController from "../controllers/insignias.controller.js";

const router = express.Router();

router.get("/", InsigniaController.getAll);
router.get("/:id", InsigniaController.getById);
router.post("/", InsigniaController.create);
router.put("/:id", InsigniaController.update);
router.delete("/:id", InsigniaController.delete);

export default router;
