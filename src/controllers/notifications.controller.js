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
      console.error('Erro ao buscar notificações:', error);
      res.status(500).json({
        message: 'Erro ao buscar notificações',
        error: error.message || error.toString(),
      });
    }
  }

  static async createNotification(req, res) {
    const { user_id, title, message } = req.body;

    if (!user_id || !title || !message) {
      return res.status(400).json({ message: 'Campos user_id, title e message são obrigatórios' });
    }

    try {
      const [id] = await db('notifications').insert({
        user_id,
        title,
        message,
        read: false,
        sent_at: new Date()
      });

      const newNotification = await db('notifications').where({ id }).first();

      res.status(201).json(newNotification);
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      res.status(500).json({
        message: 'Erro ao criar notificação',
        error: error.message || error.toString(),
      });
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
      console.error('Erro ao atualizar notificação:', error);
      res.status(500).json({
        message: 'Erro ao atualizar notificação',
        error: error.message || error.toString(),
      });
    }
  }

  static async deleteNotification(req, res) {
    const { id } = req.params;

    try {
      const deleted = await db('notifications')
        .where({ id })
        .del();

      if (!deleted) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }

      res.json({ message: 'Notificação removida com sucesso' });
    } catch (error) {
      console.error('Erro ao remover notificação:', error);
      res.status(500).json({
        message: 'Erro ao remover notificação',
        error: error.message || error.toString(),
      });
    }
  }
}

export default NotificationsController;
