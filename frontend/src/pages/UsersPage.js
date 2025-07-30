import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Grid, Box, List, ListItem, ListItemText, IconButton, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:3006/api/users';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(API_URL).then(res => setUsers(res.data));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, form).then(() => {
        setEditingId(null);
        setForm({ name: '', email: '', password: '', role: 'employee' });
        fetchUsers();
      });
    } else {
      axios.post(API_URL, form).then(() => {
        setForm({ name: '', email: '', password: '', role: 'employee' });
        fetchUsers();
      });
    }
  };

  const handleEdit = user => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
  };

  const handleDelete = id => {
    axios.delete(`${API_URL}/${id}`).then(fetchUsers);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Usuarios</Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="name" label="Nombre" value={form.name} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="password" label="Contraseña" type="password" value={form.password} onChange={handleChange} fullWidth required={!editingId} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select name="role" value={form.role} onChange={handleChange} fullWidth>
                  <MenuItem value="employee">Empleado</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">{editingId ? 'Actualizar' : 'Agregar'}</Button>
                {editingId && <Button sx={{ ml: 2 }} variant="outlined" color="secondary" onClick={() => { setEditingId(null); setForm({ name: '', email: '', password: '', role: 'employee' }); }}>Cancelar</Button>}
              </Grid>
            </Grid>
          </form>
          <List>
            {users.map(user => (
              <ListItem key={user.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user)}><EditIcon /></IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}><DeleteIcon /></IconButton>
                </>
              }>
                <ListItemText
                  primary={<b>{user.name}</b>}
                  secondary={`Email: ${user.email} | Rol: ${user.role}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
