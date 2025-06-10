// src/routes/user_insignias.routes.js

import express from 'express';
import UserInsigniasController from '../controllers/user_insignias.controller.js';

const router = express.Router();

// Pega todas as insígnias do usuário
router.get('/users/:user_id/insignias', UserInsigniasController.getUserInsignias);

// Desbloqueia uma insígnia para o usuário
router.post('/user-insignias/unlock', UserInsigniasController.unlock);

// Equipa uma insígnia específica para o usuário
router.post('/user-insignias/:insignia_id/equip', UserInsigniasController.equip);

// Desequipa uma insígnia específica para o usuário
router.post('/user-insignias/:insignia_id/unequip', UserInsigniasController.unequip);

export default router;
