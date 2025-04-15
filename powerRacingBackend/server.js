// powerRacingBackend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const preventiviRoutes = require('./routes/preventiviRoutes');

// Import corretto del file delle rotte
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5001; // Porta impostata a 5001

// ESATTAMENTE la stringa di connessione fornita, cambiando solo la password
const MONGODB_URI = 'mongodb+srv://nicolamaraschi01:marase@cluster0.chgco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Configurazione CORS migliorata - Correzione per gestire richieste da localhost:3000 e localhost:3001
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Assicurati che venga eseguito prima delle rotte
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Gestisci preflights
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

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
    // Genera un nome file unico per evitare conflitti
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
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
    
    // Crea URL per l'immagine caricata con percorso completo
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    
    res.status(200).json({
      message: 'Immagine caricata con successo',
      imageUrl
    });
  } catch (error) {
    console.error('Errore durante il caricamento dell\'immagine:', error);
    res.status(500).json({ message: 'Errore durante il caricamento dell\'immagine', error: error.message });
  }
});

// Rende accessibili i file nella cartella uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Gestione della connessione al database con migliore robustezza
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout dopo 5 secondi
    });
    console.log('✅ MongoDB Atlas connesso con successo');
    return true;
  } catch (err) {
    console.error('❌ Errore di connessione a MongoDB Atlas:', err);
    return false;
  }
};

// Tentativo di connessione con retry
(async () => {
  let retries = 5;
  let connected = false;
  
  while (retries > 0 && !connected) {
    connected = await connectDB();
    if (!connected) {
      retries -= 1;
      console.log(`Tentativo fallito, ${retries} tentativi rimasti...`);
      // Attendi 3 secondi prima di riprovare
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  if (!connected) {
    console.error('Impossibile connettersi al database dopo multipli tentativi');
    process.exit(1);
  }
})();

// Rotte per le auto
app.use('/api/cars', carRoutes);

// Rotta di test per verificare che il server funzioni
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server funzionante correttamente!', timestamp: new Date() });
});

app.use('/api/preventivi', preventiviRoutes);

// Middleware per logging delle richieste
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
});

// Gestione errori 404
app.use((req, res) => {
  res.status(404).json({ message: 'Risorsa non trovata', path: req.originalUrl });
});

// Gestione errori generici migliorata
app.use((err, req, res, next) => {
  console.error('Errore del server:', err.stack);
  
  // Gestione degli errori di validazione mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Errore di validazione', 
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Gestione degli errori di formato ID mongoose
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      message: 'Formato ID non valido', 
      error: err.message 
    });
  }
  
  // Errore generico
  res.status(500).json({ 
    message: 'Errore del server', 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Gestore di chiusura pulita
const gracefulShutdown = () => {
  console.log('🛑 Chiusura del server in corso...');
  mongoose.connection.close()
    .then(() => {
      console.log('MongoDB disconnesso correttamente');
      process.exit(0);
    })
    .catch(err => {
      console.error('Errore durante la disconnessione da MongoDB:', err);
      process.exit(1);
    });
};

// Gestione segnali di chiusura
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Avvio del server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server in esecuzione sulla porta ${PORT}`);
  console.log(`Test server: http://localhost:${PORT}/api/test`);
});

// Gestione errori del server HTTP
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ La porta ${PORT} è già in uso. Prova una porta diversa.`);
  } else {
    console.error('❌ Errore del server HTTP:', error);
  }
  process.exit(1);
});