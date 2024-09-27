const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/powerRacing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rotte
app.use('/api/cars', carRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
