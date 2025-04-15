// src/pages/cars/CarForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarForm.css';

// Icone
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mileage: 0,
    year: new Date().getFullYear(),
    price: 0,
    fuelType: 'Benzina',
    engineSize: 1000,
    power: 100,
    transmission: 'Manuale',
    drivetrain: 'Anteriore',
    doors: 5,
    seats: 5,
    color: 'Bianco',
    condition: 'Usato',
    owners: 1,
    registrationDate: new Date().toISOString().split('T')[0],
    image: 'https://via.placeholder.com/800x600?text=Auto',
    location: 'Milano',
    inspectionValidUntil: '',
    insuranceValidUntil: '',
    options: ['Clima', 'Radio'],
    contactInfo: {
      phone: '+39 02 48302847',
      email: 'info@powerracing.it',
    },
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const isEditMode = !!id;
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  // Carica i dettagli dell'auto se in modalità modifica
  useEffect(() => {
    if (isEditMode) {
      const fetchCar = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/cars/${id}`);
          setFormData(response.data);
          setImagePreview(response.data.image);
          setLoading(false);
        } catch (error) {
          console.error('Errore nel caricamento delle informazioni dell\'auto:', error);
          alert('Errore nel caricamento delle informazioni dell\'auto');
          setLoading(false);
          navigate('/cars');
        }
      };

      fetchCar();
    }
  }, [id, isEditMode, navigate, API_URL]);

  // Imposta anteprima immagine quando formData.image cambia
  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Gestisce campi nidificati come contactInfo.phone
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Gestione upload immagine
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert('Formato immagine non supportato. Utilizzare JPEG, PNG o WebP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'immagine non può superare i 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setFormData(prev => ({
        ...prev,
        image: response.data.imageUrl
      }));
      
      setImagePreview(response.data.imageUrl);
      setUploadingImage(false);
    } catch (error) {
      console.error('Errore durante il caricamento dell\'immagine:', error);
      alert('Errore durante il caricamento dell\'immagine');
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validazione campi obbligatori
    if (!formData.title.trim()) newErrors.title = 'Titolo richiesto';
    if (!formData.description.trim()) newErrors.description = 'Descrizione richiesta';
    if (!formData.fuelType) newErrors.fuelType = 'Tipo di carburante richiesto';
    if (!formData.color.trim()) newErrors.color = 'Colore richiesto';
    if (!formData.location.trim()) newErrors.location = 'Localizzazione richiesta';
    if (!formData.registrationDate) newErrors.registrationDate = 'Data di immatricolazione richiesta';
    
    // Validazione contatti
    if (!formData.contactInfo.phone) newErrors['contactInfo.phone'] = 'Telefono richiesto';
    if (!formData.contactInfo.email) newErrors['contactInfo.email'] = 'Email richiesta';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione lato client
    if (!validateForm()) {
      alert('Completa tutti i campi obbligatori');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/cars/${id}`, formData);
        alert('Auto aggiornata con successo');
      } else {
        await axios.post(`${API_URL}/cars`, formData);
        alert('Auto aggiunta con successo');
      }
      navigate('/cars');
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
      alert('Errore durante il salvataggio. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Caricamento in corso...</p>
      </div>
    );
  }

  return (
    <div className="car-form-page">
      <div className="page-header">
        <h1>{isEditMode ? 'Modifica Auto' : 'Aggiungi Auto'}</h1>
        <button 
          onClick={() => navigate('/cars')} 
          className="btn btn-secondary"
          type="button"
        >
          <ArrowBackIcon /> Torna alla lista
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-sections">
            {/* Informazioni Principali */}
            <div className="form-section">
              <h2 className="section-title">Informazioni Principali</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Marca e Modello*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                  {errors.title && <div className="error-feedback">{errors.title}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="description">Descrizione*</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows="4"
                  ></textarea>
                  {errors.description && <div className="error-feedback">{errors.description}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Prezzo (€)*</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  />
                  {errors.price && <div className="error-feedback">{errors.price}</div>}
                </div>
              </div>

              <div className="form-row cols-3">
                <div className="form-group">
                  <label htmlFor="condition">Condizione*</label>
                  <select 
                    id="condition" 
                    name="condition" 
                    value={formData.condition}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Nuovo">Nuovo</option>
                    <option value="Usato">Usato</option>
                    <option value="Km0">Km0</option>
                    <option value="Aziendale">Aziendale</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="year">Anno*</label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mileage">Chilometraggio*</label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Sezione upload immagine */}
              <div className="form-row">
                <div className="form-group image-upload-group">
                  <label>Immagine</label>
                  <div className="image-upload-container">
                    {imagePreview ? (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Anteprima" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                      </div>
                    ) : (
                      <div className="image-placeholder">
                        <ImageIcon />
                        <span>Nessuna immagine</span>
                      </div>
                    )}
                    <div className="image-upload-controls">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="image-upload-input"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="image-upload" className="btn btn-secondary">
                        {uploadingImage ? 'Caricamento...' : 'Seleziona immagine'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifiche tecniche */}
            <div className="form-section">
              <h2 className="section-title">Specifiche Tecniche</h2>

              <div className="form-row cols-3">
                <div className="form-group">
                  <label htmlFor="fuelType">Carburante*</label>
                  <select 
                    id="fuelType" 
                    name="fuelType" 
                    value={formData.fuelType}
                    onChange={handleChange}
                    className={`form-control ${errors.fuelType ? 'is-invalid' : ''}`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Benzina">Benzina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="GPL">GPL</option>
                    <option value="Metano">Metano</option>
                    <option value="Elettrico">Elettrico</option>
                    <option value="Ibrido">Ibrido</option>
                  </select>
                  {errors.fuelType && <div className="error-feedback">{errors.fuelType}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="engineSize">Cilindrata (cc)*</label>
                  <input
                    type="number"
                    id="engineSize"
                    name="engineSize"
                    value={formData.engineSize}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="power">Potenza (CV)*</label>
                  <input
                    type="number"
                    id="power"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row cols-3">
                <div className="form-group">
                  <label htmlFor="transmission">Trasmissione*</label>
                  <select 
                    id="transmission" 
                    name="transmission" 
                    value={formData.transmission}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Manuale">Manuale</option>
                    <option value="Automatico">Automatico</option>
                    <option value="Semiautomatico">Semiautomatico</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="drivetrain">Trazione*</label>
                  <select 
                    id="drivetrain" 
                    name="drivetrain" 
                    value={formData.drivetrain}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Anteriore">Anteriore</option>
                    <option value="Posteriore">Posteriore</option>
                    <option value="Integrale">Integrale</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="color">Colore*</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className={`form-control ${errors.color ? 'is-invalid' : ''}`}
                  />
                  {errors.color && <div className="error-feedback">{errors.color}</div>}
                </div>
              </div>

              <div className="form-row cols-2">
                <div className="form-group">
                  <label htmlFor="doors">Porte*</label>
                  <input
                    type="number"
                    id="doors"
                    name="doors"
                    value={formData.doors}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seats">Posti*</label>
                  <input
                    type="number"
                    id="seats"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {/* Dettagli Aggiuntivi */}
            <div className="form-section">
              <h2 className="section-title">Dettagli Aggiuntivi</h2>

              <div className="form-row cols-2">
                <div className="form-group">
                  <label htmlFor="owners">Numero Proprietari*</label>
                  <input
                    type="number"
                    id="owners"
                    name="owners"
                    value={formData.owners}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Località*</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  {errors.location && <div className="error-feedback">{errors.location}</div>}
                </div>
              </div>

              <div className="form-row cols-3">
                <div className="form-group">
                  <label htmlFor="registrationDate">Data di Immatricolazione*</label>
                  <input
                    type="date"
                    id="registrationDate"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleChange}
                    className={`form-control ${errors.registrationDate ? 'is-invalid' : ''}`}
                  />
                  {errors.registrationDate && <div className="error-feedback">{errors.registrationDate}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="inspectionValidUntil">Revisione Valida Fino</label>
                  <input
                    type="date"
                    id="inspectionValidUntil"
                    name="inspectionValidUntil"
                    value={formData.inspectionValidUntil || ''}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="insuranceValidUntil">Assicurazione Valida Fino</label>
                  <input
                    type="date"
                    id="insuranceValidUntil"
                    name="insuranceValidUntil"
                    value={formData.insuranceValidUntil || ''}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {/* Informazioni di Contatto */}
            <div className="form-section">
              <h2 className="section-title">Informazioni di Contatto</h2>

              <div className="form-row cols-2">
                <div className="form-group">
                  <label htmlFor="contactInfo.phone">Telefono*</label>
                  <input
                    type="text"
                    id="contactInfo.phone"
                    name="contactInfo.phone"
                    value={formData.contactInfo.phone}
                    onChange={handleChange}
                    className={`form-control ${errors['contactInfo.phone'] ? 'is-invalid' : ''}`}
                  />
                  {errors['contactInfo.phone'] && <div className="error-feedback">{errors['contactInfo.phone']}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="contactInfo.email">Email*</label>
                  <input
                    type="email"
                    id="contactInfo.email"
                    name="contactInfo.email"
                    value={formData.contactInfo.email}
                    onChange={handleChange}
                    className={`form-control ${errors['contactInfo.email'] ? 'is-invalid' : ''}`}
                  />
                  {errors['contactInfo.email'] && <div className="error-feedback">{errors['contactInfo.email']}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="btn btn-secondary"
            >
              Annulla
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || uploadingImage}
            >
              {loading ? (
                <span>Salvataggio in corso...</span>
              ) : (
                <span><SaveIcon /> {isEditMode ? 'Aggiorna Auto' : 'Salva Auto'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;