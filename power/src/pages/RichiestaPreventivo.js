import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RichiestaPreventivo.css';

const RichiestaPreventivo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('auto'); // 'auto' o 'moto'
  
  // Form data state
  const [formData, setFormData] = useState({
    // Dati personali
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    
    // Dati veicolo
    tipoVeicolo: 'auto',
    marca: '',
    modello: '',
    anno: '',
    targa: '',
    km: '',
    alimentazione: '',
    
    // Dettagli intervento
    tipoIntervento: [],
    descrizioneProblemaSintomi: '',
    disponibilita: '',
    autoSostitutiva: false,
    
    // Consensi
    privacyAccettata: false,
    marketingAccettata: false
  });
  
  // Opzioni per i form select
  const tipiIntervento = {
    auto: [
      'Tagliando ordinario',
      'Freni',
      'Sospensioni',
      'Cambio',
      'Motore',
      'Climatizzatore',
      'Elettronica/Elettrauto',
      'Diagnostica',
      'Pneumatici',
      'Carrozzeria',
      'Revisione',
      'Preparazione sportiva',
      'Altro'
    ],
    moto: [
      'Tagliando ordinario',
      'Freni',
      'Sospensioni',
      'Cambio',
      'Motore',
      'Elettronica',
      'Diagnostica',
      'Pneumatici',
      'Carrozzeria',
      'Revisione',
      'Preparazione sportiva',
      'Altro'
    ]
  };
  
  const alimentazioni = {
    auto: ['Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica', 'Ibrida'],
    moto: ['Benzina', 'Elettrica']
  };
  
  const marche = {
    auto: ['Alfa Romeo', 'Audi', 'BMW', 'Citroen', 'Dacia', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Lamborghini', 'Lancia', 'Land Rover', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Skoda', 'Smart', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Altro'],
    moto: ['Aprilia', 'Benelli', 'BMW', 'Ducati', 'Harley-Davidson', 'Honda', 'Husqvarna', 'Kawasaki', 'KTM', 'Moto Guzzi', 'MV Agusta', 'Suzuki', 'Triumph', 'Yamaha', 'Vespa', 'Altro']
  };
  
  // Gestione cambio tab auto/moto
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      tipoVeicolo: tab,
      marca: '',
      alimentazione: '',
      tipoIntervento: []
    }));
  };
  
  // Gestione input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Gestione checkbox multipli per tipoIntervento
  const handleInterventoChange = (value) => {
    setFormData(prev => {
      const interventoUpdated = prev.tipoIntervento.includes(value)
        ? prev.tipoIntervento.filter(item => item !== value)
        : [...prev.tipoIntervento, value];
      
      return {
        ...prev,
        tipoIntervento: interventoUpdated
      };
    });
  };
  
  // Validazione form
  const validateForm = () => {
    // Verifica campi obbligatori
    const requiredFields = ['nome', 'cognome', 'email', 'telefono', 'marca', 'modello'];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`Campo obbligatorio: ${field}`);
        return false;
      }
    }
    
    // Verifica email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Email non valida');
      return false;
    }
    
    // Verifica che sia selezionato almeno un tipo di intervento
    if (formData.tipoIntervento.length === 0) {
      alert('Seleziona almeno un tipo di intervento');
      return false;
    }
    
    // Verifica accettazione privacy
    if (!formData.privacyAccettata) {
      alert('È necessario accettare la privacy policy');
      return false;
    }
    
    return true;
  };
  
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In produzione, sostituisci con il tuo endpoint API reale
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
      
      await axios.post(`${API_URL}/preventivi`, formData);
      
      setSubmitted(true);
      // Opzionale: scroll to top
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Errore invio form:', error);
      alert('Si è verificato un errore durante l\'invio del form. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      nome: '',
      cognome: '',
      email: '',
      telefono: '',
      tipoVeicolo: 'auto',
      marca: '',
      modello: '',
      anno: '',
      targa: '',
      km: '',
      alimentazione: '',
      tipoIntervento: [],
      descrizioneProblemaSintomi: '',
      disponibilita: '',
      autoSostitutiva: false,
      privacyAccettata: false,
      marketingAccettata: false
    });
    setActiveTab('auto');
    setSubmitted(false);
  };
  
  // Rendering della conferma di invio
  if (submitted) {
    return (
      <div className="container preventivo-page my-5">
        <div className="success-message text-center py-5">
          <div className="success-icon mb-4">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Richiesta inviata con successo!</h2>
          <p className="lead mb-4">
            Grazie per averci contattato. Un nostro tecnico esaminerà la tua richiesta
            e ti contatterà al più presto per fornirti un preventivo dettagliato.
          </p>
          <p className="mb-5">
            Se hai urgenza, puoi contattarci direttamente al numero <strong>+39.02.48302847</strong>
          </p>
          <div className="mt-4">
            <button 
              className="btn btn-primary me-3" 
              onClick={() => navigate('/')}
            >
              Torna alla Home
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={resetForm}
            >
              Nuova Richiesta
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container preventivo-page my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="page-header text-center mb-5">
            <h1>Richiedi un Preventivo</h1>
            <p className="lead">
              Compila il modulo sottostante per richiedere un preventivo dettagliato per la tua auto o moto
            </p>
          </div>
          
          {/* Tabs per scegliere tra Auto e Moto */}
          <div className="vehicle-tabs mb-4">
            <div className="row">
              <div className="col-6">
                <button 
                  className={`tab-button ${activeTab === 'auto' ? 'active' : ''}`}
                  onClick={() => handleTabChange('auto')}
                >
                  <i className="fas fa-car me-2"></i> Auto
                </button>
              </div>
              <div className="col-6">
                <button 
                  className={`tab-button ${activeTab === 'moto' ? 'active' : ''}`}
                  onClick={() => handleTabChange('moto')}
                >
                  <i className="fas fa-motorcycle me-2"></i> Moto
                </button>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="preventivo-form">
            {/* Dati personali */}
            <div className="card form-section mb-4">
              <div className="card-header">
                <h3><i className="fas fa-user me-2"></i> Dati Personali</h3>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nome" className="form-label">Nome *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="nome" 
                      name="nome" 
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cognome" className="form-label">Cognome *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="cognome" 
                      name="cognome" 
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">Telefono *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="telefono" 
                      name="telefono" 
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dati veicolo */}
            <div className="card form-section mb-4">
              <div className="card-header">
                <h3>
                  {activeTab === 'auto' ? <><i className="fas fa-car me-2"></i> Dati Auto</> : <><i className="fas fa-motorcycle me-2"></i> Dati Moto</>}
                </h3>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="marca" className="form-label">Marca *</label>
                    <select 
                      className="form-select" 
                      id="marca" 
                      name="marca" 
                      value={formData.marca}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleziona marca</option>
                      {marche[activeTab].map((marca, index) => (
                        <option key={index} value={marca}>{marca}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="modello" className="form-label">Modello *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="modello" 
                      name="modello" 
                      value={formData.modello}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="anno" className="form-label">Anno</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="anno" 
                      name="anno" 
                      value={formData.anno}
                      onChange={handleChange}
                      placeholder="Es. 2018"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="targa" className="form-label">Targa</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="targa" 
                      name="targa" 
                      value={formData.targa}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="km" className="form-label">Chilometraggio</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="km" 
                      name="km" 
                      value={formData.km}
                      onChange={handleChange}
                      placeholder="Es. 50000"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="alimentazione" className="form-label">Alimentazione</label>
                    <select 
                      className="form-select" 
                      id="alimentazione" 
                      name="alimentazione" 
                      value={formData.alimentazione}
                      onChange={handleChange}
                    >
                      <option value="">Seleziona alimentazione</option>
                      {alimentazioni[activeTab].map((alimentazione, index) => (
                        <option key={index} value={alimentazione}>{alimentazione}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dettagli intervento */}
            <div className="card form-section mb-4">
              <div className="card-header">
                <h3><i className="fas fa-tools me-2"></i> Dettagli Intervento</h3>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <label className="form-label">Tipo di Intervento * (seleziona uno o più)</label>
                  <div className="intervento-checkboxes">
                    <div className="row">
                      {tipiIntervento[activeTab].map((intervento, index) => (
                        <div className="col-md-6 col-lg-4 mb-2" key={index}>
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id={`intervento-${index}`} 
                              checked={formData.tipoIntervento.includes(intervento)}
                              onChange={() => handleInterventoChange(intervento)}
                            />
                            <label className="form-check-label" htmlFor={`intervento-${index}`}>
                              {intervento}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="descrizioneProblemaSintomi" className="form-label">Descrizione del problema/sintomi</label>
                  <textarea 
                    className="form-control" 
                    id="descrizioneProblemaSintomi" 
                    name="descrizioneProblemaSintomi" 
                    rows="4"
                    value={formData.descrizioneProblemaSintomi}
                    onChange={handleChange}
                    placeholder="Descrivi dettagliatamente il problema o i sintomi riscontrati..."
                  ></textarea>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="disponibilita" className="form-label">Quando vorresti portare il veicolo?</label>
                    <select 
                      className="form-select" 
                      id="disponibilita" 
                      name="disponibilita" 
                      value={formData.disponibilita}
                      onChange={handleChange}
                    >
                      <option value="">Seleziona una disponibilità</option>
                      <option value="Prima possibile">Prima possibile</option>
                      <option value="Questa settimana">Questa settimana</option>
                      <option value="La prossima settimana">La prossima settimana</option>
                      <option value="Entro un mese">Entro un mese</option>
                      <option value="Solo per informazioni">Solo per informazioni</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check auto-sostitutiva mt-4">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="autoSostitutiva" 
                        name="autoSostitutiva"
                        checked={formData.autoSostitutiva}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="autoSostitutiva">
                        Necessito di auto sostitutiva
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy e consensi */}
            <div className="card form-section mb-4">
              <div className="card-header">
                <h3><i className="fas fa-shield-alt me-2"></i> Privacy e Consensi</h3>
              </div>
              <div className="card-body">
                <div className="form-check mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="privacyAccettata" 
                    name="privacyAccettata"
                    checked={formData.privacyAccettata}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="privacyAccettata">
                    * Ho letto e accetto la <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                  </label>
                </div>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="marketingAccettata" 
                    name="marketingAccettata"
                    checked={formData.marketingAccettata}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="marketingAccettata">
                    Acconsento al trattamento dei miei dati per finalità di marketing e comunicazioni promozionali
                  </label>
                </div>
              </div>
            </div>
            
            {/* Bottoni form */}
            <div className="form-buttons text-center">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Invio in corso...
                  </>
                ) : (
                  <>Invia Richiesta Preventivo</>
                )}
              </button>
              <p className="text-muted mt-3">
                <small>* I campi contrassegnati con asterisco sono obbligatori</small>
              </p>
            </div>
          </form>
          
          {/* Info aggiuntive */}
          <div className="info-box mt-5">
            <div className="card">
              <div className="card-body">
                <h4 className="mb-3">Informazioni Utili</h4>
                <p>
                  Una volta ricevuta la tua richiesta, il nostro team valuterà le informazioni fornite e ti contatterà
                  entro 24 ore lavorative per fornirti un preventivo dettagliato o richiedere ulteriori dettagli.
                </p>
                <p>
                  In caso di emergenza o se hai bisogno di assistenza immediata, puoi contattarci direttamente:
                </p>
                <ul className="contact-info mt-3">
                  <li><i className="fas fa-phone-alt me-2"></i> <strong>Telefono:</strong> +39.02.48302847</li>
                  <li><i className="fas fa-mobile-alt me-2"></i> <strong>Cellulare:</strong> +39 347 467 0595</li>
                  <li><i className="fas fa-envelope me-2"></i> <strong>Email:</strong> info@powerracing.it</li>
                  <li><i className="fas fa-map-marker-alt me-2"></i> <strong>Indirizzo:</strong> Via Gonin, 11, 20147 Milano</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichiestaPreventivo;