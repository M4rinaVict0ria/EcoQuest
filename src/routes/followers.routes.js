import express from "express";
import FollowerController from "../controllers/followers.controller.js";

const router = express.Router();

router.post("/", FollowerController.create);
router.get("/", FollowerController.getAll);
router.delete("/:id", FollowerController.delete);

export default router;
