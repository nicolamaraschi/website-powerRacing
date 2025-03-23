import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Imposta il token di autenticazione negli headers di Axios
      const token = JSON.parse(storedUser).token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In un'applicazione reale, questa sarebbe una chiamata API al backend
      // Qui simuliamo un login semplificato per scopi dimostrativi
      if (email === 'admin@powerracing.it' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin',
          email: 'admin@powerracing.it',
          role: 'admin',
          token: 'simulated-jwt-token'
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Imposta il token negli headers di Axios per richieste future
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Credenziali non valide. Riprova.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Errore durante il login. Riprova.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Rimuovi il token dagli headers di Axios
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};