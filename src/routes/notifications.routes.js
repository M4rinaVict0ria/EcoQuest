// src/routes/notifications.routes.js

import express from 'express';
import NotificationsController from '../controllers/notifications.controller.js';

const router = express.Router();

router.get('/users/:user_id/notifications', NotificationsController.listNotifications);
router.put('/notifications/:id/read', NotificationsController.markAsRead);
router.delete('/notifications/:id', NotificationsController.deleteNotification);

export default router;
