import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import carService from '../../services/carService';
import './CarDetails.css';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const data = await carService.getCarById(id);
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Impossibile caricare i dettagli dell\'auto');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Formatta il prezzo con separatore migliaia e simbolo €
  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
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
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
        <p className="mt-3">Caricamento dettagli in corso...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Errore!</h4>
          <p>{error || 'Auto non trovata'}</p>
          <hr />
          <p className="mb-0">Torna alla lista delle auto disponibili.</p>
          <Link to="/vetrina" className="btn btn-primary mt-3">
            Torna alla vetrina
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/vetrina">Vetrina Auto</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{car.title}</li>
        </ol>
      </nav>
      
      {/* Car Detail Header */}
      <div className="car-detail-header mb-4">
        <h1 className="display-5 fw-bold">{car.title}</h1>
        <div className="car-price-badge">
          <span className="car-price-label">Prezzo</span>
          <span className="car-price-value">{formatPrice(car.price)}</span>
        </div>
      </div>
      
      <div className="row">
        {/* Main Image and Gallery */}
        <div className="col-lg-8 mb-4">
          <div className="car-main-image mb-3">
            <img 
              src={car.image} 
              alt={car.title} 
              className="img-fluid rounded shadow"
            />
            <div className="car-condition-badge">
              {car.condition}
            </div>
          </div>
        </div>
        
        {/* Car Specs */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Caratteristiche Principali</h5>
            </div>
            <div className="card-body">
              <ul className="car-specs-list">
                <li>
                  <i className="fas fa-calendar me-2"></i>
                  <span className="spec-label">Anno:</span>
                  <span className="spec-value">{car.year}</span>
                </li>
                <li>
                  <i className="fas fa-road me-2"></i>
                  <span className="spec-label">Chilometraggio:</span>
                  <span className="spec-value">{car.mileage?.toLocaleString() || 0} km</span>
                </li>
                <li>
                  <i className="fas fa-gas-pump me-2"></i>
                  <span className="spec-label">Alimentazione:</span>
                  <span className="spec-value">{car.fuelType}</span>
                </li>
                <li>
                  <i className="fas fa-cog me-2"></i>
                  <span className="spec-label">Cambio:</span>
                  <span className="spec-value">{car.transmission}</span>
                </li>
                <li>
                  <i className="fas fa-tachometer-alt me-2"></i>
                  <span className="spec-label">Potenza:</span>
                  <span className="spec-value">{car.power} CV</span>
                </li>
                <li>
                  <i className="fas fa-car me-2"></i>
                  <span className="spec-label">Trazione:</span>
                  <span className="spec-value">{car.drivetrain}</span>
                </li>
                <li>
                  <i className="fas fa-palette me-2"></i>
                  <span className="spec-label">Colore:</span>
                  <span className="spec-value">{car.color}</span>
                </li>
                <li>
                  <i className="fas fa-users me-2"></i>
                  <span className="spec-label">Proprietari precedenti:</span>
                  <span className="spec-value">{car.owners}</span>
                </li>
              </ul>
              
              <div className="mt-4">
                <a href={`tel:${car.contactInfo?.phone}`} className="btn btn-primary w-100 mb-2">
                  <i className="fas fa-phone me-2"></i>
                  Chiama ora
                </a>
                <a href={`mailto:${car.contactInfo?.email}?subject=Informazioni su ${car.title}`} className="btn btn-outline-primary w-100">
                  <i className="fas fa-envelope me-2"></i>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Car Description */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Descrizione</h5>
            </div>
            <div className="card-body">
              <p>{car.description}</p>
            </div>
          </div>
        </div>
      </div>
      
     {/* Additional Info in Cards */}
     <div className="row">
        {/* Technical Details */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0">Dettagli Tecnici</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 mb-3">
                  <span className="tech-detail-label">Cilindrata:</span>
                  <span className="tech-detail-value">{car.engineSize} cc</span>
                </div>
                <div className="col-6 mb-3">
                  <span className="tech-detail-label">Porte:</span>
                  <span className="tech-detail-value">{car.doors}</span>
                </div>
                <div className="col-6 mb-3">
                  <span className="tech-detail-label">Posti:</span>
                  <span className="tech-detail-value">{car.seats}</span>
                </div>
                <div className="col-6 mb-3">
                  <span className="tech-detail-label">Data Immatricolazione:</span>
                  <span className="tech-detail-value">{formatDate(car.registrationDate)}</span>
                </div>
                <div className="col-6 mb-3">
                  <span className="tech-detail-label">Revisione fino a:</span>
                  <span className="tech-detail-value">{formatDate(car.inspectionValidUntil)}</span>
                </div>
                <div className="col-6">
                  <span className="tech-detail-label">Assicurazione fino a:</span>
                  <span className="tech-detail-value">{formatDate(car.insuranceValidUntil)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Optional Equipment */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0">Optional</h5>
            </div>
            <div className="card-body">
              {car.options && car.options.length > 0 ? (
                <ul className="optional-list">
                  {car.options.map((option, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle text-success me-2"></i>
                      {option}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Nessun optional specificato</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact and Location */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Info di Contatto</h5>
            </div>
            <div className="card-body">
              <p><strong>Sede:</strong> {car.location}</p>
              <p><strong>Telefono:</strong> <a href={`tel:${car.contactInfo?.phone}`}>{car.contactInfo?.phone}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${car.contactInfo?.email}`}>{car.contactInfo?.email}</a></p>
              
              <p className="mt-3 mb-1"><strong>Orari di apertura:</strong></p>
              <p className="mb-1">Lun-Ven: 8:30-12:30, 14:00-18:30</p>
              <p>Sab: 8:30-12:30</p>
            </div>
          </div>
        </div>
        
        {/* Interested in Button */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm bg-light">
            <div className="card-body text-center p-4">
              <h5 className="mb-3">Interessato a questa auto?</h5>
              <p className="mb-4">Contattaci per maggiori informazioni o per fissare un appuntamento per vederla di persona.</p>
              <div className="d-grid gap-2">
                <a href={`tel:${car.contactInfo?.phone}`} className="btn btn-primary btn-lg">
                  <i className="fas fa-phone me-2"></i>
                  Chiama ora
                </a>
                <a href={`mailto:${car.contactInfo?.email}?subject=Informazioni su ${car.title}`} className="btn btn-outline-primary">
                  <i className="fas fa-envelope me-2"></i>
                  Richiedi informazioni via email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Cars */}
      <div className="related-cars mt-5">
        <h3 className="mb-4">Auto simili che potrebbero interessarti</h3>
        <div className="row">
          {/* Placeholder for related cars - in a real implementation you would fetch similar cars */}
          <div className="col-12 text-center">
            <p className="text-muted">Caricamento auto simili...</p>
            <Link to="/vetrina" className="btn btn-outline-primary mt-2">
              Vedi tutte le auto disponibili
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;