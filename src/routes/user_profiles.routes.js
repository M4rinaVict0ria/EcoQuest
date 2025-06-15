// src/routes/user_profiles.routes.js

import express from 'express';
import UserProfilesController from '../controllers/user_profiles.controller.js';

const router = express.Router();

router.get('/:user_id/profile', UserProfilesController.getProfile);
router.put('/:user_id/profile', UserProfilesController.updateProfile);


export default router;
