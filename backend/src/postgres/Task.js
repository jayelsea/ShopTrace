const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: false } // Relación con usuario
});

module.exports = Task;