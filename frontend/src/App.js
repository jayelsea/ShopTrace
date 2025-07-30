import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryPage from './pages/InventoryPage';
import UsersPage from './pages/UsersPage';
import SalesPage from './pages/SalesPage';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import React from 'react';

function RequireAuth({ children, adminOnly }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/inventario" replace />;
  }
  return children;
}

function MenuBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ShopTrace
        </Typography>
        <Button color="inherit" component={Link} to="/inventario">Inventario</Button>
        <Button color="inherit" component={Link} to="/usuarios">Usuarios</Button>
        <Button color="inherit" component={Link} to="/ventas">Ventas</Button>
        <Button color="inherit" component={Link} to="/tareas">Tareas</Button>
        {user && <Typography sx={{ mx: 2 }}>{user.name} ({user.role})</Typography>}
        {!user && <Button color="inherit" component={Link} to="/login">Login</Button>}
        {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usuarios" element={
            <RequireAuth adminOnly={true}>
              <UsersPage />
            </RequireAuth>
          } />
          <Route path="/inventario" element={
            <RequireAuth>
              <InventoryPage />
            </RequireAuth>
          } />
          <Route path="/ventas" element={
            <RequireAuth>
              <SalesPage />
            </RequireAuth>
          } />
          <Route path="/tareas" element={
            <RequireAuth>
              <TasksPage />
            </RequireAuth>
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
