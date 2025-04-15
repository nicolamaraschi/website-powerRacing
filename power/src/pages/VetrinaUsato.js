import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarSearchFilter from '../components/CarSearchFilter';
import carService from '../services/carService'; // Importa il servizio API
import './VetrinaUsato.css';

const VetrinaUsato = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0
  });

  // Funzione per caricare auto dal server
  const loadCars = async (page = 1, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Usa il servizio API per caricare le auto
      const result = await carService.getCars({
        page,
        limit: 9,
        ...filters
      });
      
      setCars(result.cars);
      setFilteredCars(result.cars);
      setPagination(result.pagination);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError(error.message || 'Errore nel caricamento delle auto');
      setLoading(false);
    }
  };

  // Carica le auto all'inizializzazione
  useEffect(() => {
    loadCars();
  }, []);

  // Gestisce il cambio pagina
  const handlePageChange = (newPage) => {
    loadCars(newPage);
  };

  // Gestisce i filtri
  const handleFilterChange = async (filters) => {
    try {
      // Usa il servizio API per la ricerca/filtri
      const result = await carService.searchCars(
        filters.searchQuery, 
        {
          page: 1,
          limit: 9,
          minPrice: filters.priceMin,
          maxPrice: filters.priceMax,
          minYear: filters.yearMin,
          maxYear: filters.yearMax,
          maxMileage: filters.mileageMax,
          fuelType: filters.fuelType
        }
      );
      
      setFilteredCars(result.cars);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error filtering cars:', error);
      setError('Errore nell\'applicazione dei filtri');
    }
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
          <button 
            className="btn btn-outline-danger mt-3"
            onClick={() => loadCars()}
          >
            Riprova
          </button>
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
          <strong>{pagination.total}</strong> auto trovate
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
        <>
          <div className="row">
            {filteredCars.map((car) => (
              <div className="col-md-6 col-lg-4 mb-4" key={car._id}>
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
                        <strong>{car.mileage?.toLocaleString() || 0} km</strong>
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
                      <span className="fs-5 fw-bold text-primary">{car.price?.toLocaleString() || 0} €</span>
                      <Link to={`/vetrina/${car._id}`} className="btn btn-primary">
                        Dettagli
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center my-4">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      Precedente
                    </button>
                  </li>
                  
                  {[...Array(pagination.totalPages).keys()].map(number => (
                    <li 
                      key={number + 1} 
                      className={`page-item ${pagination.page === number + 1 ? 'active' : ''}`}
                    >
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${pagination.page === pagination.totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                    >
                      Successiva
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
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