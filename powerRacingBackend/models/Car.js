// powerRacingBackend/models/Car.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mileage: { type: Number, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  fuelType: { type: String, required: true },
  engineSize: { type: Number, required: true },
  power: { type: Number, required: true },
  transmission: { type: String, required: true },
  drivetrain: { type: String, required: true },
  doors: { type: Number, required: true },
  seats: { type: Number, required: true },
  color: { type: String, required: true },
  condition: { type: String, required: true },
  owners: { type: Number, required: true },
  registrationDate: { type: Date, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  inspectionValidUntil: { type: Date },
  insuranceValidUntil: { type: Date },
  options: [String],
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);