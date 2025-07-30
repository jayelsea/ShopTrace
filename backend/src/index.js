const express = require('express');
const sequelize = require('./postgres/sequelize');
const InventoryItem = require('./postgres/InventoryItem');

const app = express();
app.use(express.json());

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

app.listen(4000, () => console.log('Backend en puerto 4000'));