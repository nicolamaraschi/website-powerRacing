import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import carService from '../../services/carService';
import './CarsList.css';

// Icone MUI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    condition: '',
    fuelType: '',
  });

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await carService.getCars(currentPage, 10, { ...filters, search: searchTerm });
      setCars(response.data.cars);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError('Errore durante il caricamento delle auto');
      toast.error('Errore durante il caricamento delle auto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCars();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCars();
  };

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      condition: '',
      fuelType: '',
    });
    setSearchTerm('');
    setCurrentPage(1);
    fetchCars();
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa auto?')) {
      try {
        await carService.deleteCar(id);
        toast.success('Auto eliminata con successo');
        fetchCars();
      } catch (err) {
        toast.error('Errore durante l\'eliminazione dell\'auto');
        console.error(err);
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

  return (
    <div className="cars-list-page">
      <div className="page-header">
        <h1>Gestione Auto Usate</h1>
        <Link to="/cars/new" className="btn btn-primary">
          <AddIcon /> Aggiungi Auto
        </Link>
      </div>

      <div className="card">
        <div className="list-actions">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cerca per marca, modello..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                <SearchIcon />
              </button>
            </div>
          </form>

          <div className="filters-toggle">
            <button onClick={() => setShowFilters(!showFilters)} className="btn-filter">
              <FilterListIcon /> Filtri
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <form onSubmit={handleFilterSubmit}>
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Prezzo minimo</label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="€"
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Prezzo massimo</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="€"
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Anno minimo</label>
                  <input
                    type="number"
                    name="minYear"
                    value={filters.minYear}
                    onChange={handleFilterChange}
                    placeholder="Es. 2015"
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Anno massimo</label>
                  <input
                    type="number"
                    name="maxYear"
                    value={filters.maxYear}
                    onChange={handleFilterChange}
                    placeholder="Es. 2023"
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Condizione</label>
                  <select
                    name="condition"
                    value={filters.condition}
                    onChange={handleFilterChange}
                    className="filter-input"
                  >
                    <option value="">Tutte</option>
                    <option value="Nuovo">Nuovo</option>
                    <option value="Usato">Usato</option>
                    <option value="Km0">Km0</option>
                    <option value="Aziendale">Aziendale</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Carburante</label>
                  <select
                    name="fuelType"
                    value={filters.fuelType}
                    onChange={handleFilterChange}
                    className="filter-input"
                  >
                    <option value="">Tutti</option>
                    <option value="Benzina">Benzina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="GPL">GPL</option>
                    <option value="Metano">Metano</option>
                    <option value="Elettrico">Elettrico</option>
                    <option value="Ibrido">Ibrido</option>
                  </select>
                </div>
              </div>
              <div className="filters-actions">
                <button type="submit" className="btn btn-primary">
                  Applica filtri
                </button>
                <button type="button" onClick={resetFilters} className="btn btn-secondary">
                  Resetta filtri
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Immagine</th>
                    <th>Marca / Modello</th>
                    <th>Anno</th>
                    <th>Chilometraggio</th>
                    <th>Prezzo</th>
                    <th>Condizione</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.length > 0 ? (
                    cars.map((car) => (
                      <tr key={car._id}>
                        <td className="car-image-cell">
                     
                        <img
                        src={car.image}
                        alt={car.title}
                        className="car-thumbnail"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70"><rect width="100" height="70" fill="%23f5f5f5"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="%23aaa" text-anchor="middle" dy=".3em">No Image</text></svg>';
                        }}
                        />
                        </td>
                        <td>{car.title}</td>
                        <td>{car.year}</td>
                        <td>{car.mileage.toLocaleString('it-IT')} km</td>
                        <td>{formatPrice(car.price)}</td>
                        <td>
                          <span className={`condition-badge ${car.condition.toLowerCase()}`}>
                            {car.condition}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <Link to={`/cars/${car._id}`} className="action-button view-button">
                            <VisibilityIcon />
                          </Link>
                          <Link to={`/cars/edit/${car._id}`} className="action-button edit-button">
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => handleDeleteCar(car._id)}
                            className="action-button delete-button"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-results">
                        Nessun'auto trovata
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Precedente
                </button>
                <span className="pagination-info">
                  Pagina {currentPage} di {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Successiva
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarsList;