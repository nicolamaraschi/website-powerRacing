// powerRacingBackend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import corretto del file delle rotte
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// ESATTAMENTE la stringa di connessione fornita, cambiando solo la password
const MONGODB_URI = 'mongodb+srv://nicolamaraschi01:marase@cluster0.chgco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Configurazione CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.94:3000', 'http://192.168.1.94:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());

// Configurazione per il caricamento delle immagini
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limite 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Formato file non supportato'), false);
    }
    cb(null, true);
  }
});

// Rotta per l'upload delle immagini
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }
    
    // Crea URL per l'immagine caricata
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({
      message: 'Immagine caricata con successo',
      imageUrl
    });
  } catch (error) {
    console.error('Errore durante il caricamento dell\'immagine:', error);
    res.status(500).json({ message: 'Errore durante il caricamento dell\'immagine' });
  }
});

// Rende accessibili i file nella cartella uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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