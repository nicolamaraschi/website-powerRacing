// powerRacingBackend/routes/carRoutes.js
const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

// Rotte per le auto
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;