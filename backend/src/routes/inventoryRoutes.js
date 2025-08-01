const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', inventoryController.getAllItems);
router.post('/', upload.single('image'), inventoryController.createItem);
router.put('/:id', upload.single('image'), inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;