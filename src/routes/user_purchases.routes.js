import express from "express";
import PurchaseController from "../controllers/user_purchases.controller.js";

const router = express.Router();

router.post("/purchases", PurchaseController.create);
router.get("/users/:user_id/purchases", PurchaseController.getAll);
router.delete("/:id", PurchaseController.delete);

export default router;