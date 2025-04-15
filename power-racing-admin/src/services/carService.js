// src/services/carService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Configurazione di Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000 // 10 secondi di timeout
});

// Intercettore per aggiungere il token di autenticazione
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servizio per la gestione delle auto
const carService = {
  // Ottieni tutte le auto (con paginazione e filtri)
  getCars: async (page = 1, limit = 10, filters = {}) => {
    try {
      return await axiosInstance.get('/cars', { 
        params: { page, limit, ...filters } 
      });
    } catch (error) {
      console.error('Errore nel recupero delle auto:', error);
      throw error;
    }
  },

  // Ottieni dettagli di un'auto specifica
  getCarById: async (id) => {
    try {
      return await axiosInstance.get(`/cars/${id}`);
    } catch (error) {
      console.error(`Errore nel recupero dell'auto ${id}:`, error);
      throw error;
    }
  },

  // Crea una nuova auto
  createCar: async (carData) => {
    try {
      return await axiosInstance.post('/cars', carData);
    } catch (error) {
      console.error('Errore nella creazione dell\'auto:', error);
      throw error;
    }
  },

  // Aggiorna un'auto esistente
  updateCar: async (id, carData) => {
    try {
      return await axiosInstance.put(`/cars/${id}`, carData);
    } catch (error) {
      console.error(`Errore nell'aggiornamento dell'auto ${id}:`, error);
      throw error;
    }
  },

  // Elimina un'auto
  deleteCar: async (id) => {
    try {
      return await axiosInstance.delete(`/cars/${id}`);
    } catch (error) {
      console.error(`Errore nell'eliminazione dell'auto ${id}:`, error);
      throw error;
    }
  },

  // Carica un'immagine per un'auto
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      return await axiosInstance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Errore nel caricamento dell\'immagine:', error);
      throw error;
    }
  },
};

export default carService;