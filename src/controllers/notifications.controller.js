// src/controllers/notifications.controller.js

import db from '../../db/connection.js';

class NotificationsController {
  static async listNotifications(req, res) {
    const { user_id } = req.params;

    try {
      const notifications = await db('notifications')
        .where({ user_id })
        .orderBy('created_at', 'desc');

      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar notificações', error });
    }
  }

  static async markAsRead(req, res) {
    const { id } = req.params;

    try {
      const updated = await db('notifications')
        .where({ id })
        .update({ read: true });

      if (!updated) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }

      res.json({ message: 'Notificação marcada como lida' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar notificação', error });
    }
  }

  static async deleteNotification(req, res) {
    const { id } = req.params;

    try {
      const deleted = await db('notifications').where({ id }).del();

      if (!deleted) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }

      res.json({ message: 'Notificação removida com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover notificação', error });
    }
  }
}

export default NotificationsController;
