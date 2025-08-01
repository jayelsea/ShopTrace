const express = require('express');
const cors = require('cors');
const sequelize = require('./postgres/sequelize');
const InventoryItem = require('./postgres/InventoryItem');

const app = express();
app.use(cors());
app.use(express.json());

// Servir la carpeta uploads como archivos estáticos
app.use('/uploads', express.static(__dirname + '/../../uploads'));

// Sincronizar modelos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.listen(4000, () => console.log('Backend en puerto 4000'));