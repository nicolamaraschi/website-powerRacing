import React, { useState, useEffect } from 'react';

const CarSearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    mileageMax: '',
    fuelType: '',
    searchQuery: ''
  });

  const fuelTypes = ["Tutti", "Benzina", "Diesel", "GPL", "Metano", "Elettrico", "Ibrido"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      yearMin: '',
      yearMax: '',
      mileageMax: '',
      fuelType: '',
      searchQuery: ''
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="fas fa-search me-2"></i>
          Cerca la Tua Auto Ideale
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* Search query */}
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca per marca, modello..."
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleInputChange}
            />
          </div>

          {/* Price range */}
          <div className="col-md-6">
            <label className="form-label">Prezzo (€)</label>
            <div className="d-flex">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Min"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Year range */}
          <div className="col-md-6">
            <label className="form-label">Anno</label>
            <div className="d-flex">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Min"
                name="yearMin"
                value={filters.yearMin}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                name="yearMax"
                value={filters.yearMax}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Mileage */}
          <div className="col-md-6">
            <label className="form-label">Km Massimi</label>
            <input
              type="number"
              className="form-control"
              placeholder="es. 100000"
              name="mileageMax"
              value={filters.mileageMax}
              onChange={handleInputChange}
            />
          </div>

          {/* Fuel type */}
          <div className="col-md-6">
            <label className="form-label">Alimentazione</label>
            <select
              className="form-select"
              name="fuelType"
              value={filters.fuelType}
              onChange={handleInputChange}
            >
              {fuelTypes.map((type) => (
                <option key={type} value={type === "Tutti" ? "" : type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="col-12 d-flex justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={clearFilters}
            >
              Azzera Filtri
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-search me-2"></i>
              Cerca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSearchFilter;
