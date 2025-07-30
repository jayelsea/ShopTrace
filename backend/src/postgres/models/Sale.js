const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Sale = sequelize.define('Sale', {
  product: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Sale;