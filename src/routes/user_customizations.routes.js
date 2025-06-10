import express from 'express';
import UserCustomizationsController from '../controllers/user_customizations.controller.js';

const router = express.Router();

// Listar todas customizações do usuário
router.get('/users/:user_id/customizations', UserCustomizationsController.getUserCustomizations);

// Criar nova customização para usuário
router.post('/users/:user_id/customizations', UserCustomizationsController.create);

// Ativar customização específica (ativa só uma por tipo)
router.put('/customizations/:id/select', UserCustomizationsController.selectCustomization);

// Remover customização do usuário
router.delete('/customizations/:id', UserCustomizationsController.delete);

export default router;
