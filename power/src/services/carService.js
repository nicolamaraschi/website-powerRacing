// power/src/services/carService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Servizio per le auto della vetrina pubblica
const carService = {
  // Ottieni tutte le auto (con paginazione e filtri)
  getCars: async (filters = {}) => {
    try {
      // Imposta valori di default per paginazione
      const { page = 1, limit = 9, ...otherFilters } = filters;
      
      const response = await axiosInstance.get('/cars', { 
        params: { page, limit, ...otherFilters } 
      });
      
      return response.data;
    } catch (error) {
      console.error('Errore nel recupero delle auto:', error);
      throw error;
    }
  },

  // Ottieni dettagli di un'auto specifica
  getCarById: async (id) => {
    try {
      const response = await axiosInstance.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Errore nel recupero dell'auto ${id}:`, error);
      throw error;
    }
  },

  // Cerca auto in base a criteri
  searchCars: async (searchQuery = "", filters = {}) => {
    try {
      const { page = 1, limit = 9, ...otherFilters } = filters;
      
      const response = await axiosInstance.get('/cars', { 
        params: { 
          page, 
          limit, 
          search: searchQuery,
          ...otherFilters 
        } 
      });
      
      return response.data;
    } catch (error) {
      console.error('Errore nella ricerca delle auto:', error);
      throw error;
    }
  }
};

export default carService;