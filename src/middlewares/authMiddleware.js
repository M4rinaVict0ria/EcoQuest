import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'minha_chave_secreta';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token ausente.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.userId = verified.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
