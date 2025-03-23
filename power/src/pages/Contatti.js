import React, { useState } from 'react';
import './Contatti.css';

const Contatti = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome obbligatorio';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Formato email non valido';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Messaggio obbligatorio';
    }
    
    if (!formData.privacy) {
      errors.privacy = 'Devi accettare la privacy policy';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    
    // Simulazione invio dati
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      });
    }, 1500);
  };

  return (
    <div className="contatti-page">
      {/* Hero Section with Map */}
      <div className="contatti-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1>Dove Siamo</h1>
              <p className="lead">
                Vieni a trovarci nella nostra sede a Milano
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Large Map Section */}
      <div className="main-map-container">
        <div className="map-responsive">
          <iframe
            title="Mappa Power Racing"
            src="https://www.openstreetmap.org/export/embed.html?bbox=9.155508518218994%2C45.43615760807982%2C9.16021609210968%2C45.438163679120426&layer=mapnik&marker=45.437161,9.157862"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
        <div className="map-overlay">
          <div className="address-card">
            <h3>Power Racing</h3>
            <p><strong>Indirizzo:</strong> Via Gonin, 11 - 20147 Milano</p>
            <p><strong>Telefono:</strong> +39.02.48302847</p>
            <p><strong>Email:</strong> info@powerracing.it</p>
            <a href="https://www.google.com/maps/dir//Via+Gonin,+11,+20147+Milano+MI/" 
               className="btn btn-primary" 
               target="_blank" 
               rel="noopener noreferrer">
               Indicazioni stradali
            </a>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-4">
            <div className="contact-info-card">
              <h2>Informazioni di Contatto</h2>
              
              <div className="contact-method">
                <div className="icon-wrapper">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="info">
                  <h5>Indirizzo</h5>
                  <p>Via Gonin, 11 - 20147 Milano</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="icon-wrapper">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="info">
                  <h5>Telefono</h5>
                  <p>+39.02.48302847 r.a.</p>
                  <p>+39 347 467 0595 (Cell)</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="icon-wrapper">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="info">
                  <h5>Email</h5>
                  <p><a href="mailto:info@powerracing.it">info@powerracing.it</a></p>
                  <p><a href="mailto:bluecarmilano@yahoo.it">bluecarmilano@yahoo.it</a></p>
                </div>
              </div>

              <div className="contact-method">
                <div className="icon-wrapper">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="info">
                  <h5>Orari</h5>
                  <p>Lun-Ven: 8:30/12:30 - 14:00/18:30</p>
                  <p>Sabato: 8:30 - 12:30</p>
                </div>
              </div>

              <div className="social-links">
                <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://youtube.com" className="social-icon" aria-label="YouTube">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="faq-section">
              <h3>Domande Frequenti</h3>
              <div className="accordion" id="faqAccordion1">
                <div className="accordion-item">
                  <h4 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Come prenotare un servizio?
                    </button>
                  </h4>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion1">
                    <div className="accordion-body">
                      Puoi prenotare telefonicamente al numero +39.02.48302847 oppure compilando il modulo in questa pagina. Ti ricontatteremo per confermare l'appuntamento.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h4 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      È disponibile un'auto di cortesia?
                    </button>
                  </h4>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion1">
                    <div className="accordion-body">
                      Sì, abbiamo a disposizione auto di cortesia per i clienti durante gli interventi più lunghi. Ti consigliamo di richiederla in anticipo per verificare la disponibilità.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            {formSubmitted ? (
              <div className="form-success-message">
                <div className="text-center mb-4">
                  <div className="success-icon">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <h2 className="mt-3">Grazie per averci contattato!</h2>
                  <p className="lead">
                    Il tuo messaggio è stato inviato con successo. Ti risponderemo al più presto.
                  </p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              </div>
            ) : (
              <div className="contact-form-container">
                <h2 className="mb-4">Inviaci un Messaggio</h2>
                <p className="text-muted mb-4">
                  Compila il modulo sottostante e ti risponderemo entro 24 ore.
                  Tutti i campi contrassegnati con * sono obbligatori.
                </p>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6 form-group">
                      <label htmlFor="name" className="form-label">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        placeholder="Inserisci il tuo nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.name && (
                        <div className="invalid-feedback">{formErrors.name}</div>
                      )}
                    </div>
                    
                    <div className="col-md-6 form-group">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="Inserisci la tua email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.email && (
                        <div className="invalid-feedback">{formErrors.email}</div>
                      )}
                    </div>
                    
                    <div className="col-md-6 form-group">
                      <label htmlFor="phone" className="form-label">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Inserisci il tuo numero di telefono"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="col-md-6 form-group">
                      <label htmlFor="subject" className="form-label">
                        Oggetto
                      </label>
                      <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Seleziona oggetto...</option>
                        <option value="Informazioni generali">Informazioni generali</option>
                        <option value="Richiesta preventivo">Richiesta preventivo</option>
                        <option value="Assistenza post-vendita">Assistenza post-vendita</option>
                        <option value="Prenotazione servizio">Prenotazione servizio</option>
                        <option value="Informazioni usato">Informazioni auto usate</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>
                    
                    <div className="col-12 form-group">
                      <label htmlFor="message" className="form-label">
                        Messaggio *
                      </label>
                      <textarea
                        className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Scrivi qui il tuo messaggio..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      {formErrors.message && (
                        <div className="invalid-feedback">{formErrors.message}</div>
                      )}
                    </div>
                    
                    <div className="col-12">
                      <div className={`form-check ${formErrors.privacy ? 'is-invalid' : ''}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="privacy"
                          name="privacy"
                          checked={formData.privacy}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="privacy">
                          Ho letto e accetto la <a href="/privacy">Privacy Policy</a> *
                        </label>
                        {formErrors.privacy && (
                          <div className="invalid-feedback d-block">{formErrors.privacy}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-12 mt-4">
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
                          <>
                            <i className="bi bi-send me-2"></i>
                            Invia Messaggio
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-white mb-3">Hai bisogno di assistenza immediata?</h2>
              <p className="text-white mb-4">
                Il nostro team di esperti è pronto ad aiutarti
              </p>
              <a href="tel:+390248302847" className="btn btn-light btn-lg">
                <i className="bi bi-telephone me-2"></i>
                Chiamaci Ora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatti;