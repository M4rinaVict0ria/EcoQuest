import express from 'express';
import ConfigController from '../controllers/config.controller.js';

const router = express.Router();

router.get('/users/:user_id/inventory', ConfigController.getInventory);
router.put('/users/:user_id/profile-color', ConfigController.updateProfileColor);
router.put('/users/:user_id/email', ConfigController.updateEmail);
router.put('/users/:user_id/password', ConfigController.updatePassword);
router.get('/users/:user_id/blocked', ConfigController.getBlockedUsers);
router.delete('/blocks/:id', ConfigController.unblockUser);
router.put('/users/:user_id/privacy', ConfigController.updatePrivacy);

export default router;
