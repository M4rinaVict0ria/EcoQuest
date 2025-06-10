// src/routes/store.routes.js
import express from "express";
import StoreController from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", StoreController.create);
router.get("/store", StoreController.getAll);
router.get("/store/:id", StoreController.getById);
router.delete("/store/:id", StoreController.delete);

export default router;
