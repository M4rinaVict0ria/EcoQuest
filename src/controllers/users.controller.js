import db from '../../db/connection.js';
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

      // Validação
      UserSchema.parse({ nome, email, senha });

      // Verificar email duplicado
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

      // Inicializa seguidores e seguindo para esse usuário
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
    const { id } = req.params;
    const userId = Number(id);

    const user = usuarios.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // Exemplo de dados extras que você pode colocar aqui
    const profile = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      pontos: user.pontos,
      missoesConcluidas: user.missoesConcluidas,
      // Dados fictícios para seguidores, seguindo, nível, progresso
      seguidoresCount: seguidoresMap.get(userId)?.length || 0,
      seguindoCount: seguindoMap.get(userId)?.length || 0,
      nivel: 1,
      progressoNivel: 50 // %
    };

    return res.status(200).json(profile);
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const updateData = req.body;

      // Validação parcial
      UpdateUserSchema.parse(updateData);

      const userIndex = usuarios.findIndex(u => u.id === userId);
      if (userIndex === -1) return res.status(404).json({ message: 'Usuário não encontrado.' });

      // Se atualizar email, checar duplicidade
      if (updateData.email) {
        const emailExists = usuarios.some(u => u.email === updateData.email && u.id !== userId);
        if (emailExists) {
          return res.status(400).json({ message: 'Email já cadastrado por outro usuário.' });
        }
      }

      // Atualiza campos (senha atualizada aqui diretamente, mas pode ser melhor hash se quiser)
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
    const { id } = req.params;
    const userId = Number(id);

    const userIndex = usuarios.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ message: 'Usuário não encontrado.' });

    usuarios.splice(userIndex, 1);

    seguidoresMap.delete(userId);
    seguindoMap.delete(userId);

    return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  },

  getFollowers(req, res) {
    const { id } = req.params;
    const userId = Number(id);

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
    const { id } = req.params;
    const userId = Number(id);

    if (!seguindoMap.has(userId)) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const seguindoIds = seguindoMap.get(userId);
    const seguindo = seguindoIds.map(fid => {
      const user = usuarios.find(u => u.id === fid);
      return user ? { id: user.id, nome: user.nome, email: user.email } : null;
    }).filter(Boolean);

    return res.status(200).json(seguindo);
  }
};

export default UsersController;
