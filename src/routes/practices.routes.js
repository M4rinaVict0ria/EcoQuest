import express from "express";
import PracticesController from "../controllers/practices.controller.js";

const router = express.Router();

// Listar práticas de um tema (GET /practices/themes/:theme_id)
router.get("/themes/:theme_id", PracticesController.getAllByTheme);

// Detalhar prática (GET /practices/:id)
router.get("/:id", PracticesController.getById);

// Criar prática (POST /practices)
router.post("/", PracticesController.create);

// Atualizar prática (PUT /practices/:id)
router.put("/:id", PracticesController.update);

export default router;
