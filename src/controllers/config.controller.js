// Dados mockados em memória
const usersData = new Map();

const ConfigController = {
  // Ver inventário do usuário
  getInventory(req, res) {
    const { user_id } = req.params;
    const user = usersData.get(user_id);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json({
      bannersDesbloqueados: user.bannersDesbloqueados || [],
      bannersBloqueados: user.bannersBloqueados || [],
      moldurasDesbloqueadas: user.moldurasDesbloqueadas || [],
      moldurasBloqueadas: user.moldurasBloqueadas || [],
    });
  },

  // Atualizar cor do perfil
  updateProfileColor(req, res) {
    const { user_id } = req.params;
    const { cor } = req.body;

    if (!cor) return res.status(400).json({ error: "Cor é obrigatória" });

    const user = usersData.get(user_id) || {};
    user.corPerfil = cor;
    usersData.set(user_id, user);

    return res.json({ message: "Cor do perfil atualizada", cor });
  },

  // Atualizar e-mail
  updateEmail(req, res) {
    const { user_id } = req.params;
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email é obrigatório" });

    const user = usersData.get(user_id) || {};
    user.email = email;
    usersData.set(user_id, user);

    return res.json({ message: "Email atualizado", email });
  },

  // Atualizar senha
  updatePassword(req, res) {
    const { user_id } = req.params;
    const { senha } = req.body;

    if (!senha) return res.status(400).json({ error: "Senha é obrigatória" });

    const user = usersData.get(user_id) || {};
    user.senha = senha; // Em produção, **nunca** salve senha em texto puro.
    usersData.set(user_id, user);

    return res.json({ message: "Senha atualizada" });
  },

  // Ver usuários bloqueados
  getBlockedUsers(req, res) {
    const { user_id } = req.params;
    const user = usersData.get(user_id);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json({ bloqueados: user.bloqueados || [] });
  },

  // Desbloquear usuário
  unblockUser(req, res) {
    const { id } = req.params;

    for (let [userId, user] of usersData.entries()) {
      if (user.bloqueados && user.bloqueados.includes(id)) {
        user.bloqueados = user.bloqueados.filter(u => u !== id);
        usersData.set(userId, user);
        return res.json({ message: `Usuário ${id} desbloqueado` });
      }
    }

    return res.status(404).json({ error: "Usuário não encontrado na lista de bloqueados" });
  },
  
    // Atualizar visibilidade do perfil (público/privado)
  updatePrivacy(req, res) {
    const { user_id } = req.params;
    const { isPrivate } = req.body;

    if (typeof isPrivate !== "boolean") {
      return res.status(400).json({ error: "O campo isPrivate deve ser true ou false" });
    }

    const user = usersData.get(user_id) || {};
    user.isPrivate = isPrivate;
    usersData.set(user_id, user);

    return res.json({ message: "Privacidade do perfil atualizada", isPrivate });
  },
};

export default ConfigController;
