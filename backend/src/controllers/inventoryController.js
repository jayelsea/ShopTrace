const InventoryItem = require('../postgres/InventoryItem');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.getAllItems = async (req, res) => {
  const items = await InventoryItem.findAll();
  res.json(items);
};

async function processImage(file) {
  if (!file) return null;
  const outputPath = path.join(file.destination, 'resized-' + file.filename);
  await sharp(file.path)
    .resize(300, 300)
    .toFile(outputPath);
  fs.unlinkSync(file.path); // elimina el original
  return '/uploads/' + path.basename(outputPath);
}

exports.createItem = async (req, res) => {
  let data = req.body;
  if (req.file) {
    data.image = await processImage(req.file);
  }
  const item = await InventoryItem.create(data);
  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  let data = req.body;
  if (req.file) {
    data.image = await processImage(req.file);
  }
  await InventoryItem.update(data, { where: { id } });
  const updatedItem = await InventoryItem.findByPk(id);
  res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await InventoryItem.destroy({ where: { id } });
  res.status(204).send();
};