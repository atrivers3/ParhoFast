import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'instructor'

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT payload (base64)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
        setViewMode(payload.role === 'teacher' ? 'instructor' : 'student');
      } catch(e) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    const payload = JSON.parse(atob(res.data.token.split('.')[1]));
    setUser(payload);
    setViewMode(payload.role === 'teacher' ? 'instructor' : 'student');
  };

  const register = async (username, name, email, password, role) => {
    await api.post('/auth/register', { username, name, email, password, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setViewMode('student');
  };

  const toggleViewMode = () => {
    if (user?.role === 'teacher') {
      setViewMode(prev => prev === 'instructor' ? 'student' : 'instructor');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, viewMode, toggleViewMode, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
