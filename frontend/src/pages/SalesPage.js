import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Grid, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:3006/api/sales';

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ product: '', quantity: 1, total: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    axios.get(API_URL).then(res => setSales(res.data));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, form).then(() => {
        setEditingId(null);
        setForm({ product: '', quantity: 1, total: 0 });
        fetchSales();
      });
    } else {
      axios.post(API_URL, form).then(() => {
        setForm({ product: '', quantity: 1, total: 0 });
        fetchSales();
      });
    }
  };

  const handleEdit = sale => {
    setEditingId(sale.id);
    setForm({
      product: sale.product,
      quantity: sale.quantity,
      total: sale.total
    });
  };

  const handleDelete = id => {
    axios.delete(`${API_URL}/${id}`).then(fetchSales);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Ventas</Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="product" label="Producto" value={form.product} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField name="quantity" label="Cantidad" type="number" value={form.quantity} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField name="total" label="Total" type="number" value={form.total} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">{editingId ? 'Actualizar' : 'Agregar'}</Button>
                {editingId && <Button sx={{ ml: 2 }} variant="outlined" color="secondary" onClick={() => { setEditingId(null); setForm({ product: '', quantity: 1, total: 0 }); }}>Cancelar</Button>}
              </Grid>
            </Grid>
          </form>
          <List>
            {sales.map(sale => (
              <ListItem key={sale.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(sale)}><EditIcon /></IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(sale.id)}><DeleteIcon /></IconButton>
                </>
              }>
                <ListItemText
                  primary={<b>{sale.product}</b>}
                  secondary={`Cantidad: ${sale.quantity} | Total: $${sale.total}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SalesPage;
