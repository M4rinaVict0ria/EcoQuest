import db from '../../db/connection.js';

class BlocksController {
  static async blockUser(req, res) {
    const { blocker_id, blocked_id } = req.body;

    if (!blocker_id || !blocked_id) {
      return res.status(400).json({ message: 'IDs de bloqueador e bloqueado são obrigatórios' });
    }

    try {
      // Verifica se já existe bloqueio igual para evitar duplicidade
      const existing = await db('blocks')
        .where({ blocker_id, blocked_id })
        .first();
      if (existing) {
        return res.status(400).json({ message: 'Usuário já bloqueado' });
      }

      // Adiciona bloqueio
      const [id] = await db('blocks').insert({ blocker_id, blocked_id }).returning('id');

      // Remove seguidores mútuos
      await db('followers')
        .where(function () {
          this.where('following_user_id', blocker_id).andWhere('followed_user_id', blocked_id);
        })
        .orWhere(function () {
          this.where('following_user_id', blocked_id).andWhere('followed_user_id', blocker_id);
        })
        .del();

      res.status(201).json({ message: 'Usuário bloqueado com sucesso', block_id: id });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao bloquear usuário', error: error.message });
    }
  }

  static async unblockUser(req, res) {
    const { id } = req.params;

    try {
      const deleted = await db('blocks').where({ id }).del();

      if (!deleted) {
        return res.status(404).json({ message: 'Bloqueio não encontrado' });
      }

      res.json({ message: 'Usuário desbloqueado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao desbloquear usuário', error: error.message });
    }
  }
}

export default BlocksController;
