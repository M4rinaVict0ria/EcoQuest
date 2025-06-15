import { z } from "zod";

const UserSchema = z.object({
  nome: z.string({ message: 'Nome inválido' }).min(6, { message: 'Nome deve ter no mínimo 6 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  senha: z.string({ message: 'Senha inválida' }).min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
});

const UpdateUserSchema = z.object({
  nome: z.string().min(6).optional(),
  email: z.string().email().optional(),
  senha: z.string().min(8).optional(),
});

const usuarios = [];
let nextUserId = 1;

const seguidoresMap = new Map(); // userId -> array de seguidores (ids)
const seguindoMap = new Map();   // userId -> array de seguindo (ids)

const UsersController = {
  async createUser(req, res) {
    try {
      const { nome, email, senha } = req.body;

      UserSchema.parse({ nome, email, senha });

      const emailExists = usuarios.some(u => u.email === email);
      if (emailExists) {
        return res.status(400).json({ message: 'Email já cadastrado.' });
      }

      const novoUsuario = {
        id: nextUserId++,
        nome,
        email,
        senha,
        pontos: 0,
        missoesConcluidas: [],
      };

      usuarios.push(novoUsuario);

      seguidoresMap.set(novoUsuario.id, []);
      seguindoMap.set(novoUsuario.id, []);

      return res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          details: error.errors
        });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  getAllUsers(req, res) {
    const usersSafe = usuarios.map(({ senha, ...rest }) => rest);
    return res.status(200).json(usersSafe);
  },

  getUserById(req, res) {
    const userId = Number(req.params.id);

    const user = usuarios.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const profile = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      pontos: user.pontos,
      missoesConcluidas: user.missoesConcluidas,
      seguidoresCount: seguidoresMap.get(userId)?.length || 0,
      seguindoCount: seguindoMap.get(userId)?.length || 0,
      nivel: 1,
      progressoNivel: 50
    };

    return res.status(200).json(profile);
  },

  async updateUser(req, res) {
    try {
      const userId = Number(req.params.id);
      const updateData = req.body;

      UpdateUserSchema.parse(updateData);

      const userIndex = usuarios.findIndex(u => u.id === userId);
      if (userIndex === -1) return res.status(404).json({ message: 'Usuário não encontrado.' });

      if (updateData.email) {
        const emailExists = usuarios.some(u => u.email === updateData.email && u.id !== userId);
        if (emailExists) {
          return res.status(400).json({ message: 'Email já cadastrado por outro usuário.' });
        }
      }

      usuarios[userIndex] = { ...usuarios[userIndex], ...updateData };

      const { senha, ...userSafe } = usuarios[userIndex];
      return res.status(200).json(userSafe);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          details: error.errors
        });
      }
      return res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
    }
  },

  deleteUser(req, res) {
    const userId = Number(req.params.id);

    const userIndex = usuarios.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ message: 'Usuário não encontrado.' });

    usuarios.splice(userIndex, 1);

    seguidoresMap.delete(userId);
    seguindoMap.delete(userId);

    // Remover este usuário das listas de seguidores e seguindo dos outros usuários
    seguidoresMap.forEach((seguidores, key) => {
      seguidoresMap.set(key, seguidores.filter(id => id !== userId));
    });
    seguindoMap.forEach((seguindo, key) => {
      seguindoMap.set(key, seguindo.filter(id => id !== userId));
    });

    return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  },

  getFollowers(req, res) {
    const userId = Number(req.params.id);

    if (!seguidoresMap.has(userId)) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const seguidoresIds = seguidoresMap.get(userId);
    const seguidores = seguidoresIds.map(fid => {
      const user = usuarios.find(u => u.id === fid);
      return user ? { id: user.id, nome: user.nome, email: user.email } : null;
    }).filter(Boolean);

    return res.status(200).json(seguidores);
  },

  getFollowing(req, res) {
    const userId = Number(req.params.id);

    if (!seguindoMap.has(userId)) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const seguindoIds = seguindoMap.get(userId);
    const seguindo = seguindoIds.map(fid => {
      const user = usuarios.find(u => u.id === fid);
      return user ? { id: user.id, nome: user.nome, email: user.email } : null;
    }).filter(Boolean);

    return res.status(200).json(seguindo);
  },

  followUser(req, res) {
    const userId = Number(req.params.id);
    const targetId = Number(req.params.targetId);

    if (userId === targetId) {
      return res.status(400).json({ message: "Você não pode seguir a si mesmo." });
    }

    const userExists = usuarios.some(u => u.id === userId);
    const targetExists = usuarios.some(u => u.id === targetId);

    if (!userExists || !targetExists) {
      return res.status(404).json({ message: "Usuário ou usuário alvo não encontrado." });
    }

    const seguindo = seguindoMap.get(userId) || [];
    if (seguindo.includes(targetId)) {
      return res.status(400).json({ message: "Você já está seguindo esse usuário." });
    }
    seguindo.push(targetId);
    seguindoMap.set(userId, seguindo);

    const seguidores = seguidoresMap.get(targetId) || [];
    seguidores.push(userId);
    seguidoresMap.set(targetId, seguidores);

    return res.status(200).json({ message: "Usuário seguido com sucesso." });
  },

  unfollowUser(req, res) {
    const userId = Number(req.params.id);
    const targetId = Number(req.params.targetId);

    const userExists = usuarios.some(u => u.id === userId);
    const targetExists = usuarios.some(u => u.id === targetId);

    if (!userExists || !targetExists) {
      return res.status(404).json({ message: "Usuário ou usuário alvo não encontrado." });
    }

    let seguindo = seguindoMap.get(userId) || [];
    if (!seguindo.includes(targetId)) {
      return res.status(400).json({ message: "Você não está seguindo esse usuário." });
    }
    seguindo = seguindo.filter(id => id !== targetId);
    seguindoMap.set(userId, seguindo);

    let seguidores = seguidoresMap.get(targetId) || [];
    seguidores = seguidores.filter(id => id !== userId);
    seguidoresMap.set(targetId, seguidores);

    return res.status(200).json({ message: "Usuário deixou de seguir com sucesso." });
  }
};

export default UsersController;
