const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/powerRacing', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Configurazione di multer per l'upload di file
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite di 5MB
  fileFilter: function(req, file, cb) {
    // Accetta solo immagini
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('Solo i file immagine sono consentiti!'), false);
    }
    cb(null, true);
  }
});

// Crea la cartella uploads se non esiste
if (!fs.existsSync('./uploads')){
  fs.mkdirSync('./uploads');
}

// Servi i file statici dalla cartella uploads
app.use('/uploads', express.static('uploads'));

// Rotta per l'upload delle immagini
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ 
    imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` 
  });
});

// Rotte per le auto
app.use('/api/cars', carRoutes);

// Gestione errori 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Risorsa non trovata' });
});

// Gestione errori generici
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Errore del server', error: err.message });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});