const Car = require('../models/Car');

// Crea una nuova auto
const createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ottieni tutte le auto con paginazione e filtri
const getAllCars = async (req, res) => {
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
    
    // Esegui la query
    const cars = await Car.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    // Conta il totale dei documenti che soddisfano la query
    const total = await Car.countDocuments(query);
    
    res.json({
      cars,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ottieni un'auto specifica per ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Auto non trovata' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Aggiorna un'auto per ID
const updateCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).json({ message: 'Auto non trovata' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Elimina un'auto per ID
const deleteCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Auto non trovata' });
    }
    res.json({ message: 'Auto eliminata con successo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
};