const User = require('../postgres/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};
