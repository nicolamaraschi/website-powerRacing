// powerRacingBackend/models/Preventivo.js
const mongoose = require('mongoose');

const PreventivoSchema = new mongoose.Schema({
  // Dati personali
  nome: {
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  
  // Dati veicolo
  tipoVeicolo: {
    type: String,
    enum: ['auto', 'moto'],
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  modello: {
    type: String,
    required: true
  },
  anno: {
    type: Number
  },
  targa: {
    type: String
  },
  km: {
    type: Number
  },
  alimentazione: {
    type: String
  },
  
  // Dettagli intervento
  tipoIntervento: {
    type: [String],
    required: true
  },
  descrizioneProblemaSintomi: {
    type: String
  },
  disponibilita: {
    type: String
  },
  autoSostitutiva: {
    type: Boolean,
    default: false
  },
  
  // Stato preventivo
  status: {
    type: String,
    enum: ['ricevuto', 'in elaborazione', 'inviato', 'approvato', 'rifiutato', 'completato'],
    default: 'ricevuto'
  },
  
  // Dettagli preventivo (compilati dall'officina)
  costoStimato: {
    type: Number
  },
  tempoStimato: {
    type: String
  },
  noteInterne: {
    type: String
  },
  
  // Consensi
  privacyAccettata: {
    type: Boolean,
    required: true
  },
  marketingAccettata: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Preventivo', PreventivoSchema);