const InventoryItem = require('../postgres/InventoryItem');
const Sale = require('../postgres/Sale');
const { Op, col } = require('sequelize');

exports.getNotifications = async (req, res) => {
  // Notificaciones de stock bajo
  const stock = [];
  const lowStockItems = await InventoryItem.findAll({ where: { quantity: { [Op.lte]: col('minStock') } } });
  lowStockItems.forEach(item => {
    stock.push({
      message: `Stock bajo: ${item.name} (quedan ${item.quantity}, mínimo recomendado: ${item.minStock})`,
      date: new Date()
    });
  });
  // Historial de ventas
  const sales = [];
  const recentSales = await Sale.findAll({ order: [['date', 'DESC']], limit: 5 });
  recentSales.forEach(sale => {
    sales.push({
      message: `Venta: ${sale.product} x${sale.quantity} ($${sale.total})`,
      date: sale.date
    });
  });
  res.json({ stock, sales });
};
