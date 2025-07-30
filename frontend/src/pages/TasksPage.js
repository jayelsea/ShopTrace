import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Grid, Box, List, ListItem, ListItemText, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:3006/api/tasks';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', completed: false });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(API_URL).then(res => setTasks(res.data));
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, form).then(() => {
        setEditingId(null);
        setForm({ title: '', description: '', completed: false });
        fetchTasks();
      });
    } else {
      axios.post(API_URL, form).then(() => {
        setForm({ title: '', description: '', completed: false });
        fetchTasks();
      });
    }
  };

  const handleEdit = task => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  };

  const handleDelete = id => {
    axios.delete(`${API_URL}/${id}`).then(fetchTasks);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Tareas</Typography>
          <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="title" label="Título" value={form.title} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="description" label="Descripción" value={form.description} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="completed" checked={form.completed} onChange={handleChange} />}
                  label="Completada"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">{editingId ? 'Actualizar' : 'Agregar'}</Button>
                {editingId && <Button sx={{ ml: 2 }} variant="outlined" color="secondary" onClick={() => { setEditingId(null); setForm({ title: '', description: '', completed: false }); }}>Cancelar</Button>}
              </Grid>
            </Grid>
          </form>
          <List>
            {tasks.map(task => (
              <ListItem key={task.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}><EditIcon /></IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}><DeleteIcon /></IconButton>
                </>
              }>
                <ListItemText
                  primary={<b>{task.title}</b>}
                  secondary={`Descripción: ${task.description || '-'} | Estado: ${task.completed ? 'Completada' : 'Pendiente'}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TasksPage;
