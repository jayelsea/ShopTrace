const Sale = require('../postgres/Sale');
const InventoryItem = require('../postgres/InventoryItem');

exports.getAllSales = async (req, res) => {
  const sales = await Sale.findAll();
  res.json(sales);
};

exports.createSale = async (req, res) => {
  const { product, quantity } = req.body;
  const item = await InventoryItem.findOne({ where: { name: product } });
  if (!item) {
    return res.status(400).json({ message: 'Producto no encontrado en inventario' });
  }
  if (item.quantity < quantity) {
    return res.status(400).json({ message: 'Stock insuficiente' });
  }
  // Descontar stock
  item.quantity -= quantity;
  await item.save();
  const sale = await Sale.create(req.body);
  res.status(201).json(sale);
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;
  await Sale.update(req.body, { where: { id } });
  const updatedSale = await Sale.findByPk(id);
  res.json(updatedSale);
};

exports.deleteSale = async (req, res) => {
  const { id } = req.params;
  await Sale.destroy({ where: { id } });
  res.status(204).send();
};
