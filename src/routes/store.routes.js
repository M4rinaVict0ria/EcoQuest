import express from "express";
import StoreController from "../controllers/store.controller.js";

const router = express.Router();

router.post("/", StoreController.create);
router.get("/", StoreController.getAll);
router.get("/:id", StoreController.getById);
router.delete("/:id", StoreController.delete);

export default router;
