import express from 'express';
import NotificationsController from '../controllers/notifications.controller.js';

const router = express.Router();

router.get('/users/:user_id', NotificationsController.listNotifications);
router.put('/:id/read', NotificationsController.markAsRead);
router.delete('/:id', NotificationsController.deleteNotification);
router.post('/', NotificationsController.createNotification);


export default router;
