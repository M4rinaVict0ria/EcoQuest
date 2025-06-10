// src/routes/privacy_settings.routes.js

import express from 'express';
import PrivacySettingsController from '../controllers/privacy_settings.controller.js';

const router = express.Router();

router.get('/users/:user_id/privacy', PrivacySettingsController.getPrivacy);
router.put('/users/:user_id/privacy', PrivacySettingsController.updatePrivacy);

export default router;
