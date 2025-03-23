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

// Servizio per la gestione delle auto
const carService = {
  // Ottieni tutte le auto (con paginazione e filtri)
  getCars: async (page = 1, limit = 10, filters = {}) => {
    try {
      // In un'applicazione reale, dovresti inviare i parametri di query
      // Per ora simuliamo una risposta
      // const response = await axiosInstance.get('/cars', { params: { page, limit, ...filters } });
      
      // Dati di esempio per simulare la risposta
      const sampleCars = [
        {
          _id: '1',
          title: 'Fiat Panda',
          description: 'Ottima city car in buone condizioni',
          mileage: 78000,
          year: 2018,
          price: 8500,
          fuelType: 'Benzina',
          engineSize: 1200,
          power: 69,
          transmission: 'Manuale',
          drivetrain: 'Anteriore',
          doors: 5,
          seats: 5,
          color: 'Bianco',
          condition: 'Usato',
          owners: 1,
          registrationDate: '2018-03-15',
          image: 'https://via.placeholder.com/400x300?text=Fiat+Panda',
          location: 'Milano',
          options: ['Clima', 'Radio', 'Bluetooth'],
        },
        {
          _id: '2',
          title: 'Audi A3 Sportback',
          description: 'Elegante berlina in ottime condizioni',
          mileage: 45000,
          year: 2020,
          price: 23800,
          fuelType: 'Diesel',
          engineSize: 1600,
          power: 116,
          transmission: 'Automatico',
          drivetrain: 'Anteriore',
          doors: 5,
          seats: 5,
          color: 'Grigio',
          condition: 'Usato',
          owners: 1,
          registrationDate: '2020-05-10',
          image: 'https://via.placeholder.com/400x300?text=Audi+A3',
          location: 'Milano',
          options: ['Clima automatico', 'Navigatore', 'Sensori parcheggio', 'Bluetooth'],
        },
        {
          _id: '3',
          title: 'BMW Serie 1',
          description: 'Sportiva e compatta, perfetta per la città',
          mileage: 32000,
          year: 2021,
          price: 29500,
          fuelType: 'Benzina',
          engineSize: 1500,
          power: 136,
          transmission: 'Automatico',
          drivetrain: 'Posteriore',
          doors: 5,
          seats: 5,
          color: 'Blu',
          condition: 'Usato',
          owners: 1,
          registrationDate: '2021-01-23',
          image: 'https://via.placeholder.com/400x300?text=BMW+Serie+1',
          location: 'Milano',
          options: ['Clima automatico', 'Navigatore', 'Sensori parcheggio', 'Telecamera posteriore', 'Bluetooth'],
        },
      ];
      
      // Simulazione di paginazione
      const total = sampleCars.length;
      const totalPages = Math.ceil(total / limit);
      
      return {
        data: {
          cars: sampleCars,
          pagination: {
            page,
            limit,
            total,
            totalPages
          }
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Ottieni dettagli di un'auto specifica
  getCarById: async (id) => {
    try {
      // In un'applicazione reale, dovresti fare una richiesta API
      // const response = await axiosInstance.get(`/cars/${id}`);
      
      // Simuliamo una risposta per l'auto con l'ID specificato
      const sampleCars = [
        {
          _id: '1',
          title: 'Fiat Panda',
          description: 'Ottima city car in buone condizioni',
          mileage: 78000,
          year: 2018,
          price: 8500,
          fuelType: 'Benzina',
          engineSize: 1200,
          power: 69,
          transmission: 'Manuale',
          drivetrain: 'Anteriore',
          doors: 5,
          seats: 5,
          color: 'Bianco',
          condition: 'Usato',
          owners: 1,
          registrationDate: '2018-03-15',
          image: 'https://via.placeholder.com/400x300?text=Fiat+Panda',
          location: 'Milano',
          inspectionValidUntil: '2024-03-15',
          insuranceValidUntil: '2023-12-31',
          options: ['Clima', 'Radio', 'Bluetooth'],
          contactInfo: {
            phone: '+39 02 48302847',
            email: 'info@powerracing.it'
          }
        },
        {
          _id: '2',
          title: 'Audi A3 Sportback',
          description: 'Elegante berlina in ottime condizioni',
          mileage: 45000,
          year: 2020,
          price: 23800,
          fuelType: 'Diesel',
          engineSize: 1600,
          power: 116,
          transmission: 'Automatico',
          drivetrain: 'Anteriore',
          doors: 5,
          seats: 5,
          color: 'Grigio',
          condition: 'Usato',
          owners: 1,
          registrationDate: '2020-05-10',
          image: 'https://via.placeholder.com/400x300?text=Audi+A3',
          location: 'Milano',
          inspectionValidUntil: '2024-05-10',
          insuranceValidUntil: '2023-12-31',
          options: ['Clima automatico', 'Navigatore', 'Sensori parcheggio', 'Bluetooth'],
          contactInfo: {
            phone: '+39 02 48302847',
            email: 'info@powerracing.it'
          }
        },
        {
          _id: '3',
          title: 'BMW Serie 1',
          description: 'Sportiva e compatta, perfetta per la città',
          mileage: 32000,
          year: 2021,
          price: 29500,
          fuelType: 'Benzina',
          engineSize: 1500,
          power: 136,
          transmission: 'Automatico',
          drivetrain: 'Posteriore',
          doors: 5,
          seats: 5,
          color: 'Blu',
          condition: 'Usato',
          owners: 1,
          registrationDate: '2021-01-23',
          image: 'https://via.placeholder.com/400x300?text=BMW+Serie+1',
          location: 'Milano',
          inspectionValidUntil: '2025-01-23',
          insuranceValidUntil: '2023-12-31',
          options: ['Clima automatico', 'Navigatore', 'Sensori parcheggio', 'Telecamera posteriore', 'Bluetooth'],
          contactInfo: {
            phone: '+39 02 48302847',
            email: 'info@powerracing.it'
          }
        },
      ];
      
      const car = sampleCars.find(car => car._id === id);
      
      if (!car) {
        throw new Error('Auto non trovata');
      }
      
      return { data: car };
    } catch (error) {
      throw error;
    }
  },

  // Crea una nuova auto
  createCar: async (carData) => {
    try {
      // In un'applicazione reale, dovresti inviare i dati all'API
      // const response = await axiosInstance.post('/cars', carData);
      
      // Simuliamo una risposta
      const createdCar = {
        ...carData,
        _id: Date.now().toString(), // Genera un ID fittizio
      };
      
      return { data: createdCar };
    } catch (error) {
      throw error;
    }
  },

  // Aggiorna un'auto esistente
  updateCar: async (id, carData) => {
    try {
      // In un'applicazione reale, dovresti inviare i dati all'API
      // const response = await axiosInstance.put(`/cars/${id}`, carData);
      
      // Simuliamo una risposta
      const updatedCar = {
        ...carData,
        _id: id,
      };
      
      return { data: updatedCar };
    } catch (error) {
      throw error;
    }
  },

  // Elimina un'auto
  deleteCar: async (id) => {
    try {
      // In un'applicazione reale, dovresti inviare una richiesta DELETE all'API
      // const response = await axiosInstance.delete(`/cars/${id}`);
      
      // Simuliamo una risposta
      return { data: { message: 'Auto eliminata con successo' } };
    } catch (error) {
      throw error;
    }
  },

  // Carica un'immagine per un'auto
  uploadImage: async (file) => {
    try {
      // In un'applicazione reale, dovresti caricare il file all'API
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await axiosInstance.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      
      // Simuliamo una risposta
      return { 
        data: { 
          imageUrl: URL.createObjectURL(file) // Genera un URL temporaneo per l'anteprima
        } 
      };
    } catch (error) {
      throw error;
    }
  },
};

export default carService;