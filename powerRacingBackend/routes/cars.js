const express = require('express');
const {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
} = require('../controllers/carController');

const router = express.Router();

// Crea una nuova auto
router.post('/', createCar);

// Ottieni tutte le auto
router.get('/', getAllCars);

// Ottieni un'auto specifica per ID
router.get('/:id', getCarById);

// Aggiorna un'auto per ID
router.put('/:id', updateCarById);

// Elimina un'auto per ID
router.delete('/:id', deleteCarById);

module.exports = router;