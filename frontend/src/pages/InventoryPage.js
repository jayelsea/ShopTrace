import React, { useEffect, useState } from 'react';
import { getInventory, createItem, updateItem, deleteItem } from '../services/inventoryService';
import { Card, CardContent, Typography, TextField, Button, Grid, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: 0, price: 0, minStock: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    getInventory().then(res => setItems(res.data));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      updateItem(editingId, form).then(() => {
        setEditingId(null);
        setForm({ name: '', description: '', quantity: 0, price: 0, minStock: 0 });
        fetchItems();
      });
    } else {
      createItem(form).then(() => {
        setForm({ name: '', description: '', quantity: 0, price: 0, minStock: 0 });
        fetchItems();
      });
    }
  };

  const handleEdit = item => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      minStock: item.minStock
    });
  };

  const handleDelete = id => {
    deleteItem(id).then(fetchItems);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Inventario</Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="name" label="Nombre" value={form.name} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="description" label="Descripción" value={form.description} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField name="quantity" label="Cantidad" type="number" value={form.quantity} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField name="price" label="Precio" type="number" value={form.price} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField name="minStock" label="Stock mínimo" type="number" value={form.minStock} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">{editingId ? 'Actualizar' : 'Agregar'}</Button>
                {editingId && <Button sx={{ ml: 2 }} variant="outlined" color="secondary" onClick={() => { setEditingId(null); setForm({ name: '', description: '', quantity: 0, price: 0, minStock: 0 }); }}>Cancelar</Button>}
              </Grid>
            </Grid>
          </form>
          <List>
            {items.map(item => (
              <ListItem key={item.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}><EditIcon /></IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
                </>
              }>
                <ListItemText
                  primary={<b>{item.name}</b>}
                  secondary={`Descripción: ${item.description || '-'} | Cantidad: ${item.quantity} | Precio: $${item.price} | Stock mínimo: ${item.minStock}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InventoryPage;