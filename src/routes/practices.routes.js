import express from "express";
import PracticesController from "../controllers/practices.controller.js";

const router = express.Router();

// Listar práticas de um tema
router.get("/themes/:theme_id/practices", PracticesController.getAllByTheme);

// Detalhar prática
router.get("/practices/:id", PracticesController.getById);

// Criar prática (admin)
router.post("/practices", PracticesController.create);

// Atualizar prática (admin)
router.put("/practices/:id", PracticesController.update);

export default router;
