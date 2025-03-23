// File: src/services/carService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configurazione di Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Servizio per la gestione delle auto - SOLO CHIAMATE API REALI
const carService = {
  // Ottieni tutte le auto (con paginazione e filtri)
  getCars: async (page = 1, limit = 10, filters = {}) => {
    const response = await axiosInstance.get('/cars', { 
      params: { page, limit, ...filters } 
    });
    return response;
  },

  // Ottieni dettagli di un'auto specifica
  getCarById: async (id) => {
    const response = await axiosInstance.get(`/cars/${id}`);
    return response;
  },

  // Crea una nuova auto
  createCar: async (carData) => {
    const response = await axiosInstance.post('/cars', carData);
    return response;
  },

  // Aggiorna un'auto esistente
  updateCar: async (id, carData) => {
    const response = await axiosInstance.put(`/cars/${id}`, carData);
    return response;
  },

  // Elimina un'auto
  deleteCar: async (id) => {
    const response = await axiosInstance.delete(`/cars/${id}`);
    return response;
  },

  // Carica un'immagine per un'auto
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};

export default carService;