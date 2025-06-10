import express from "express";
import ThemesController from "../controllers/themes.controller.js";

const router = express.Router();

router.get("/", ThemesController.getAll);       // GET /themes
router.get("/:id", ThemesController.getById);   // GET /themes/:id
router.post("/", ThemesController.create);      // POST /themes (admin)
router.put("/:id", ThemesController.update);    // PUT /themes/:id (admin)

export default router;
