import db from '../../db/connection.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'minha_chave_secreta';

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    const userExists = await db('users').where({ email }).first();
    if (userExists) return res.status(400).json({ message: 'Email já cadastrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db('users').insert({
      name,
      email,
      username,
      password: hashedPassword,
      role: 'user',
      created_at: new Date(),
    }).returning('id');

    res.status(201).json({ message: 'Usuário criado com sucesso.', userId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar.', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta.' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};

export const logout = (req, res) => {
  // Como JWT é stateless, logout no backend normalmente é feito no frontend apagando o token.
  // Se quiser implementar blacklist, pode fazer aqui.
  res.status(200).json({ message: 'Logout realizado com sucesso.' });
};

export const me = async (req, res) => {
  try {
    const user = await db('users').where({ id: req.userId }).select('id', 'name', 'email', 'role').first();
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.', error: error.message });
  }
};
