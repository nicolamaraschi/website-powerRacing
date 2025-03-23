import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import carService from '../../services/carService';
import './CarDetails.css';

// Icone
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaletteIcon from '@mui/icons-material/Palette';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await carService.getCarById(id);
        setCar(response.data);
      } catch (error) {
        setError('Errore nel caricamento delle informazioni dell\'auto');
        toast.error('Errore nel caricamento delle informazioni dell\'auto');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Sei sicuro di voler eliminare questa auto?')) {
      try {
        await carService.deleteCar(id);
        toast.success('Auto eliminata con successo');
        navigate('/cars');
      } catch (error) {
        toast.error('Errore durante l\'eliminazione dell\'auto');
        console.error(error);
      }
    }
  };

  // Formatta il prezzo con separatori delle migliaia e simbolo €
  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Formatta la data in formato italiano
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
        <button onClick={() => navigate('/cars')} className="btn btn-primary">
          Torna alla lista
        </button>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="page-header">
        <h1>{car.title}</h1>
        <div className="header-actions">
          <Link to="/cars" className="btn btn-secondary">
            <ArrowBackIcon /> Torna alla lista
          </Link>
          <Link to={`/cars/edit/${id}`} className="btn btn-primary">
            <EditIcon /> Modifica
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <DeleteIcon /> Elimina
          </button>
        </div>
      </div>

      <div className="car-details-grid">
        <div className="car-details-main">
          <div className="card">
            <div className="car-image-container">
              <img
                src={car.image}
                alt={car.title}
                className="car-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x500?text=Immagine+non+disponibile";
                }}
              />
            </div>
            <div className="car-main-info">
              <div className="car-price-container">
                <span className="car-price-label">Prezzo</span>
                <span className="car-price">{formatPrice(car.price)}</span>
              </div>
              <div className="car-description">
                <h3>Descrizione</h3>
                <p>{car.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="car-details-sidebar">
          <div className="card car-spec-card">
            <h3>Specifiche</h3>
            <ul className="car-specs-list">
              <li>
                <DirectionsCarIcon />
                <span className="spec-label">Condizione</span>
                <span className="spec-value">
                  <span className={`condition-badge ${car.condition.toLowerCase()}`}>
                    {car.condition}
                  </span>
                </span>
              </li>
              <li>
                <CalendarTodayIcon />
                <span className="spec-label">Anno</span>
                <span className="spec-value">{car.year}</span>
              </li>
              <li>
                <SpeedIcon />
                <span className="spec-label">Chilometraggio</span>
                <span className="spec-value">{car.mileage.toLocaleString('it-IT')} km</span>
              </li>
              <li>
                <LocalGasStationIcon />
                <span className="spec-label">Carburante</span>
                <span className="spec-value">{car.fuelType}</span>
              </li>
              <li>
                <SettingsIcon />
                <span className="spec-label">Trasmissione</span>
                <span className="spec-value">{car.transmission}</span>
              </li>
              <li>
                <PersonIcon />
                <span className="spec-label">Proprietari</span>
                <span className="spec-value">{car.owners}</span>
              </li>
              <li>
                <PaletteIcon />
                <span className="spec-label">Colore</span>
                <span className="spec-value">{car.color}</span>
              </li>
              <li>
                <LocationOnIcon />
                <span className="spec-label">Località</span>
                <span className="spec-value">{car.location}</span>
              </li>
            </ul>
          </div>

          <div className="card car-details-card">
            <h3>Dettagli Tecnici</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Cilindrata</span>
                <span className="detail-value">{car.engineSize} cc</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Potenza</span>
                <span className="detail-value">{car.power} CV</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Trazione</span>
                <span className="detail-value">{car.drivetrain}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Porte</span>
                <span className="detail-value">{car.doors}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Posti</span>
                <span className="detail-value">{car.seats}</span>
              </div>
            </div>
          </div>

          <div className="card car-dates-card">
            <h3>Date Importanti</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Immatricolazione</span>
                <span className="detail-value">{formatDate(car.registrationDate)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Revisione valida fino</span>
                <span className="detail-value">{formatDate(car.inspectionValidUntil)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Assicurazione valida fino</span>
                <span className="detail-value">{formatDate(car.insuranceValidUntil)}</span>
              </div>
            </div>
          </div>

          <div className="card car-options-card">
            <h3>Optional</h3>
            <ul className="options-list">
              {car.options && car.options.length > 0 ? (
                car.options.map((option, index) => (
                  <li key={index}>
                    <CheckCircleIcon />
                    <span>{option}</span>
                  </li>
                ))
              ) : (
                <li className="no-options">Nessun optional specificato</li>
              )}
            </ul>
          </div>

          <div className="card car-contact-card">
            <h3>Informazioni di Contatto</h3>
            <ul className="contact-list">
              <li>
                <PhoneIcon />
                <span>{car.contactInfo.phone}</span>
              </li>
              <li>
                <EmailIcon />
                <span>{car.contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;