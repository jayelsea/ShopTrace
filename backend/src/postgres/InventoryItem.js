const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const InventoryItem = sequelize.define('InventoryItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  minStock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  image: { type: DataTypes.STRING } // ruta de la imagen
});

module.exports = InventoryItem;