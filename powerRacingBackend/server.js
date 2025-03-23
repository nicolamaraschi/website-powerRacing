// powerRacingBackend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// Nel file server.js, modifica questa riga:
const carRoutes = require('./routes/cars');

const app = express();
const PORT = process.env.PORT || 5000;

// Sostituisci con la tua password reale
const DB_PASSWORD = 'nicolamaraschi01';
const MONGODB_URI = `mongodb+srv://nicolamaraschi01:${DB_PASSWORD}@cluster0.chgco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Configurazione CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.94:3000', 'http://192.168.1.94:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());

// Connessione a MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas connesso con successo');
  })
  .catch(err => {
    console.error('Errore di connessione a MongoDB Atlas:', err);
  });

// Rotte per le auto
app.use('/api/cars', carRoutes);

// Rotta di test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server funzionante correttamente!' });
});

// Gestione errori 404
app.use((req, res) => {
  res.status(404).json({ message: 'Risorsa non trovata' });
});

// Gestione errori generici
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Errore del server', error: err.message });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});