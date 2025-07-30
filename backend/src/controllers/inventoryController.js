const InventoryItem = require('../postgres/InventoryItem');

exports.getAllItems = async (req, res) => {
  const items = await InventoryItem.findAll();
  res.json(items);
};

exports.createItem = async (req, res) => {
  const item = await InventoryItem.create(req.body);
  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  await InventoryItem.update(req.body, { where: { id } });
  const updatedItem = await InventoryItem.findByPk(id);
  res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await InventoryItem.destroy({ where: { id } });
  res.status(204).send();
};