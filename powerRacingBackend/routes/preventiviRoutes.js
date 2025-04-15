// powerRacingBackend/routes/preventiviRoutes.js
const express = require('express');
const router = express.Router();

// Controller per i preventivi
const preventiviController = {
  // Creazione di un nuovo preventivo
  createPreventivo: async (req, res) => {
    try {
      // Qui inseriresti la logica di salvataggio su database
      console.log('Richiesta preventivo ricevuta:', req.body);
      
      // Simulazione delay di processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Invia email di notifica (simulato)
      console.log('Email inviata al cliente:', req.body.email);
      console.log('Email inviata all\'officina per nuovo preventivo');
      
      res.status(201).json({ 
        message: 'Richiesta preventivo ricevuta con successo',
        preventivo: {
          id: Date.now().toString(),
          ...req.body,
          status: 'ricevuto',
          createdAt: new Date()
        }
      });
    } catch (error) {
      console.error('Errore nella creazione del preventivo:', error);
      res.status(500).json({ message: 'Errore durante l\'elaborazione della richiesta' });
    }
  },
  
  // Ottenere tutti i preventivi (per admin)
  getAllPreventivi: async (req, res) => {
    try {
      // Simulazione recupero preventivi da database
      res.status(200).json({ 
        message: 'Funzionalità disponibile solo per admin',
        preventivi: []
      });
    } catch (error) {
      console.error('Errore nel recupero dei preventivi:', error);
      res.status(500).json({ message: 'Errore durante il recupero dei preventivi' });
    }
  }
};

// Definizione delle rotte
router.post('/', preventiviController.createPreventivo);
router.get('/', preventiviController.getAllPreventivi);

module.exports = router;