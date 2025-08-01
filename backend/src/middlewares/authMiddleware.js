// Middleware para autenticar usando JWT en el header Authorization: Bearer <token>
const jwt = require('jsonwebtoken');
const SECRET = 'shoptrace-secret'; // Debe estar en variable de entorno en producción

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido' });
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
