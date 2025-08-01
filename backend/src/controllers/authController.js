const User = require('../postgres/User');
const sequelize = require('../postgres/sequelize');
const jwt = require('jsonwebtoken');
const SECRET = 'shoptrace-secret'; // Debe estar en variable de entorno en producción

exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({
    where: {
      [sequelize.Sequelize.Op.or]: [
        { email: identifier },
        { name: identifier }
      ]
    }
  });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  // Generar token JWT
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, SECRET, { expiresIn: '1d' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
};
