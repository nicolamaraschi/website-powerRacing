import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarSearchFilter from '../components/CarSearchFilter';
import './VetrinaUsato.css';

const VetrinaUsato = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/cars.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento dei dati');
        }
        return response.json();
      })
      .then(data => {
        setCars(data);
        setFilteredCars(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (filters) => {
    let result = [...cars];

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(car => 
        car.title.toLowerCase().includes(query) || 
        car.description.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (filters.priceMin) {
      result = result.filter(car => car.price >= parseInt(filters.priceMin));
    }
    
    if (filters.priceMax) {
      result = result.filter(car => car.price <= parseInt(filters.priceMax));
    }

    // Apply year range filter
    if (filters.yearMin) {
      result = result.filter(car => car.year >= parseInt(filters.yearMin));
    }
    
    if (filters.yearMax) {
      result = result.filter(car => car.year <= parseInt(filters.yearMax));
    }

    // Apply mileage filter
    if (filters.mileageMax) {
      result = result.filter(car => car.mileage <= parseInt(filters.mileageMax));
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }

    setFilteredCars(result);
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
        <p className="mt-3">Caricamento auto in corso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Errore!</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Si prega di riprovare più tardi o contattare l'assistenza.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">🚗 Auto Usate in Vendita</h1>

      {/* Search and Filter Component */}
      <CarSearchFilter onFilterChange={handleFilterChange} />

      {/* Results count */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="mb-0">
          <strong>{filteredCars.length}</strong> auto trovate
        </p>
        <div className="btn-group">
          <button type="button" className="btn btn-outline-secondary">
            <i className="fas fa-th-large"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary">
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>

      {/* Cars grid */}
      {filteredCars.length > 0 ? (
        <div className="row">
          {filteredCars.map((car, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  <img src={car.image} className="card-img-top" alt={car.title} />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    {car.condition}
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{car.title} 🚘</h5>
                  <p className="card-text text-muted">{car.description}</p>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">
                        <i className="fas fa-road me-1"></i> Chilometraggio
                      </small>
                      <strong>{car.mileage.toLocaleString()} km</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">
                        <i className="fas fa-calendar me-1"></i> Anno
                      </small>
                      <strong>{car.year}</strong>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">
                        <i className="fas fa-gas-pump me-1"></i> Alimentazione
                      </small>
                      <strong>{car.fuelType}</strong>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">
                        <i className="fas fa-cog me-1"></i> Cambio
                      </small>
                      <strong>{car.transmission}</strong>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fs-5 fw-bold text-primary">{car.price.toLocaleString()} €</span>
                    <Link to={`/vetrina/${car.id || index}`} className="btn btn-primary">
                      Dettagli
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          <i className="fas fa-search me-2"></i>
          Nessuna auto trovata con i filtri selezionati. Prova a modificare i criteri di ricerca.
        </div>
      )}
    </div>
  );
};

export default VetrinaUsato;
