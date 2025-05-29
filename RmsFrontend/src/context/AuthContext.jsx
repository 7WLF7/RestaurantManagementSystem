// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5049/api/Auth/api/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(console.error);
  }, [token]);

  const login = ({ user, token: jwt }) => {
    setCurrentUser(user);
    setToken(jwt);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', jwt);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}