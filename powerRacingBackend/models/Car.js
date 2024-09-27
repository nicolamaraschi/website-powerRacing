const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Marca e Modello dell'auto (es. "Fiat Panda")
  description: { type: String, required: true }, // Descrizione breve dell'auto
  mileage: { type: Number, required: true }, // Chilometraggio
  year: { type: Number, required: true }, // Anno di immatricolazione
  price: { type: Number, required: true }, // Prezzo di vendita
  fuelType: { type: String, required: true }, // Tipo di carburante (es. "Benzina", "Diesel", "GPL", "Elettrico")
  engineSize: { type: Number, required: true }, // Cilindrata in CC (es. 1600 per un motore 1.6L)
  power: { type: Number, required: true }, // Potenza in cavalli (es. 120 CV)
  transmission: { type: String, required: true }, // Trasmissione (es. "Manuale", "Automatico")
  drivetrain: { type: String, required: true }, // Tipo di trazione (es. "Anteriore", "Posteriore", "4x4")
  doors: { type: Number, required: true }, // Numero di porte (es. 3, 5)
  seats: { type: Number, required: true }, // Numero di posti (es. 4, 5)
  color: { type: String, required: true }, // Colore dell'auto
  condition: { type: String, required: true }, // Condizioni dell'auto (es. "Usato", "Nuovo", "Seminuovo")
  owners: { type: Number, required: true }, // Numero di proprietari precedenti
  registrationDate: { type: Date, required: true }, // Data di prima immatricolazione
  image: { type: String, required: true }, // URL dell'immagine
  location: { type: String, required: true }, // Posizione del veicolo (es. città o regione)
  inspectionValidUntil: { type: Date, required: false }, // Data di validità della revisione (se disponibile)
  insuranceValidUntil: { type: Date, required: false }, // Data di validità dell'assicurazione (se disponibile)
  options: [String], // Lista opzionale di accessori o caratteristiche (es. "Climatizzatore", "Navigatore", "Fendinebbia")
  contactInfo: {
    phone: { type: String, required: true }, // Numero di telefono per il contatto
    email: { type: String, required: true }, // Email per il contatto
  }
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
