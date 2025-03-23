// powerRacingBackend/controllers/carController.js
const Car = require('../models/Car');

// Ottieni tutte le auto con paginazione e filtri
exports.getCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, minPrice, maxPrice, minYear, maxYear, condition, fuelType } = req.query;
    
    // Costruisci il filtro di query
    const query = {};
    
    // Aggiungi filtri se presenti
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    if (minPrice) {
      query.price = { ...query.price, $gte: parseInt(minPrice) };
    }
    
    if (maxPrice) {
      query.price = { ...query.price, $lte: parseInt(maxPrice) };
    }
    
    if (minYear) {
      query.year = { ...query.year, $gte: parseInt(minYear) };
    }
    
    if (maxYear) {
      query.year = { ...query.year, $lte: parseInt(maxYear) };
    }
    
    if (condition) {
      query.condition = condition;
    }
    
    if (fuelType) {
      query.fuelType = fuelType;
    }
    
    // Esegui la query con paginazione
    const cars = await Car.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });
    
    // Conta il totale dei documenti che soddisfano la query
    const total = await Car.countDocuments(query);
    
    res.json({
      cars,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Errore in getCars:', err);
    res.status(500).json({ message: err.message });
  }
};

// Ottieni un'auto specifica per ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Auto non trovata' });
    }
    res.json(car);
  } catch (err) {
    console.error('Errore in getCarById:', err);
    res.status(500).json({ message: err.message });
  }
};

// Crea una nuova auto
exports.createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    console.error('Errore in createCar:', err);
    res.status(400).json({ message: err.message });
  }
};

// Aggiorna un'auto esistente
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!car) {
      return res.status(404).json({ message: 'Auto non trovata' });
    }
    
    res.json(car);
  } catch (err) {
    console.error('Errore in updateCar:', err);
    res.status(400).json({ message: err.message });
  }
};

// Elimina un'auto
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Auto non trovata' });
    }
    
    res.json({ message: 'Auto eliminata con successo' });
  } catch (err) {
    console.error('Errore in deleteCar:', err);
    res.status(500).json({ message: err.message });
  }
};