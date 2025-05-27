// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import RoleRoute from './components/RoleRoute';
import Homepage from './pages/Homepage';
import Menu from './pages/Menu';
import CartPage from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <RoleRoute allowedRoles={[ 'Admin' ]}>
                  <AdminDashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <RoleRoute allowedRoles={[ 'Angajat' ]}>
                  <EmployeeDashboard />
                </RoleRoute>
              }
            />

            <Route path="*" element={<Navigate to="/homepage" replace />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
