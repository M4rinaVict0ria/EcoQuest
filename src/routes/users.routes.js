import express from "express";
const router = express.Router();

import UsersController from "../controllers/users.controller.js";

// Criar usuário
router.post("/", UsersController.createUser);

// Listar todos usuários
router.get("/", UsersController.getAllUsers);

// Ver perfil do usuário por id
router.get("/:id", UsersController.getUserById);

// Atualizar usuário por id
router.put("/:id", UsersController.updateUser);

// Deletar usuário por id
router.delete("/:id", UsersController.deleteUser);

// Ver seguidores do usuário
router.get("/:id/followers", UsersController.getFollowers);

// Ver quem o usuário segue
router.get("/:id/following", UsersController.getFollowing);

// Seguir um usuário
router.post("/:id/follow/:targetId", UsersController.followUser);

// Deixar de seguir um usuário
router.delete("/:id/unfollow/:targetId", UsersController.unfollowUser);

export default router;
