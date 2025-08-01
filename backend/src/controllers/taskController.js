const Task = require('../postgres/Task');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

// Obtener tareas del usuario autenticado
exports.getMyTasks = async (req, res) => {
  const userId = req.user.id;
  const tasks = await Task.findAll({ where: { userId } });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  await Task.update(req.body, { where: { id } });
  const updatedTask = await Task.findByPk(id);
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.status(204).send();
};
