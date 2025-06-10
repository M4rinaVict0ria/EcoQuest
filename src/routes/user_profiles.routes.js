// src/routes/user_profiles.routes.js

import express from 'express';
import UserProfilesController from '../controllers/user_profiles.controller.js';

const router = express.Router();

router.get('/users/:user_id/profile', UserProfilesController.getProfile);
router.put('/users/:user_id/profile', UserProfilesController.updateProfile);

export default router;
