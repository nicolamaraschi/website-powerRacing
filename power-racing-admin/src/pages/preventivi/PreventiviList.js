// power-racing-admin/src/pages/preventivi/PreventiviList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './PreventiviList.css';

// Icone
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const PreventiviList = () => {
  const [preventivi, setPreventivi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    tipoVeicolo: '',
    dataInizio: '',
    dataFine: '',
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  const fetchPreventivi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/preventivi`, {
        params: { 
          page: currentPage, 
          limit: 10, 
          ...filters, 
          search: searchTerm 
        }
      });
      
      // In una implementazione reale, useremmo response.data
      // Per demo, usiamo dati simulati se la risposta è vuota
      if (response.data && response.data.preventivi && response.data.preventivi.length > 0) {
        setPreventivi(response.data.preventivi);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        // Dati simulati per la demo
        const mockPreventivi = generateMockPreventivi();
        setPreventivi(mockPreventivi);
        setTotalPages(Math.ceil(mockPreventivi.length / 10));
      }
    } catch (err) {
      console.error('Errore durante il caricamento dei preventivi:', err);
      setError('Impossibile caricare i preventivi. Riprova più tardi.');
      toast.error('Errore durante il caricamento dei preventivi');
      
      // Carica dati di esempio in caso di errore
      const mockPreventivi = generateMockPreventivi();
      setPreventivi(mockPreventivi);
      setTotalPages(Math.ceil(mockPreventivi.length / 10));
    } finally {
      setLoading(false);
    }
  };

  // Funzione per generare dati di esempio
  const generateMockPreventivi = () => {
    const statuses = ['ricevuto', 'in elaborazione', 'inviato', 'approvato', 'rifiutato', 'completato'];
    const tipiVeicolo = ['auto', 'moto'];
    const marche = {
      auto: ['Fiat', 'Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford'],
      moto: ['Honda', 'Yamaha', 'Ducati', 'Harley-Davidson', 'KTM', 'Aprilia']
    };
    const modelli = {
      auto: ['500', 'Golf', 'Serie 3', 'Classe C', 'A4', 'Corolla', 'Focus'],
      moto: ['CBR', 'YZF', 'Panigale', 'Sportster', 'Duke', 'RS']
    };
    const tipiIntervento = [
      'Tagliando ordinario', 'Freni', 'Sospensioni', 'Cambio', 'Motore', 
      'Climatizzatore', 'Elettronica', 'Diagnostica', 'Pneumatici', 'Revisione'
    ];
    
    return Array.from({ length: 25 }, (_, index) => {
      const tipoVeicolo = tipiVeicolo[Math.floor(Math.random() * tipiVeicolo.length)];
      const marcaList = marche[tipoVeicolo];
      const modelloList = modelli[tipoVeicolo];
      
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
      
      return {
        _id: `prev-${index + 1}`,
        nome: `Cliente ${index + 1}`,
        cognome: `Cognome ${index + 1}`,
        email: `cliente${index + 1}@example.com`,
        telefono: `+39 33${Math.floor(1000000 + Math.random() * 9000000)}`,
        tipoVeicolo,
        marca: marcaList[Math.floor(Math.random() * marcaList.length)],
        modello: modelloList[Math.floor(Math.random() * modelloList.length)],
        anno: 2015 + Math.floor(Math.random() * 8),
        km: Math.floor(10000 + Math.random() * 90000),
        tipoIntervento: [tipiIntervento[Math.floor(Math.random() * tipiIntervento.length)]],
        descrizioneProblemaSintomi: 'Descrizione del problema...',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString()
      };
    });
  };

  useEffect(() => {
    fetchPreventivi();
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPreventivi();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPreventivi();
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      tipoVeicolo: '',
      dataInizio: '',
      dataFine: '',
    });
    setSearchTerm('');
    setCurrentPage(1);
    fetchPreventivi();
  };

  const handleDeletePreventivo = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa richiesta di preventivo?')) {
      try {
        await axios.delete(`${API_URL}/preventivi/${id}`);
        toast.success('Preventivo eliminato con successo');
        fetchPreventivi();
      } catch (err) {
        console.error('Errore durante l\'eliminazione del preventivo:', err);
        toast.error('Errore durante l\'eliminazione del preventivo');
      }
    }
  };

  // Formatta la data in formato italiano
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Ottieni classe CSS in base allo stato del preventivo
  const getStatusClass = (status) => {
    switch(status) {
      case 'ricevuto': return 'status-received';
      case 'in elaborazione': return 'status-processing';
      case 'inviato': return 'status-sent';
      case 'approvato': return 'status-approved';
      case 'rifiutato': return 'status-rejected';
      case 'completato': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="preventivi-list-page">
      <div className="page-header">
        <h1>Gestione Richieste Preventivi</h1>
      </div>

      <div className="card">
        <div className="list-actions">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cerca per nome, email, telefono..."
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
                  <label>Stato</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="filter-input"
                  >
                    <option value="">Tutti</option>
                    <option value="ricevuto">Ricevuto</option>
                    <option value="in elaborazione">In elaborazione</option>
                    <option value="inviato">Inviato</option>
                    <option value="approvato">Approvato</option>
                    <option value="rifiutato">Rifiutato</option>
                    <option value="completato">Completato</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Tipo Veicolo</label>
                  <select
                    name="tipoVeicolo"
                    value={filters.tipoVeicolo}
                    onChange={handleFilterChange}
                    className="filter-input"
                  >
                    <option value="">Tutti</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Moto</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Data da</label>
                  <input
                    type="date"
                    name="dataInizio"
                    value={filters.dataInizio}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Data a</label>
                  <input
                    type="date"
                    name="dataFine"
                    value={filters.dataFine}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
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
            <p className="mt-3 text-center">Caricamento in corso...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            <div className="d-flex align-items-center mb-3">
              <ReportProblemIcon style={{ fontSize: 24, marginRight: '10px' }} />
              <h5 className="mb-0">Si è verificato un errore</h5>
            </div>
            <p>{error}</p>
            <div className="mt-3">
              <button 
                onClick={fetchPreventivi} 
                className="btn btn-outline-danger"
              >
                <RefreshIcon fontSize="small" className="me-2" />
                Riprova
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Veicolo</th>
                    <th>Tipo Intervento</th>
                    <th>Data Richiesta</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {preventivi && preventivi.length > 0 ? (
                    preventivi.map((preventivo) => (
                      <tr key={preventivo._id}>
                        <td>#{preventivo._id.substring(preventivo._id.length - 5)}</td>
                        <td>
                          <div>{preventivo.nome} {preventivo.cognome}</div>
                          <small className="text-muted">{preventivo.email}</small>
                        </td>
                        <td>
                          <div>{preventivo.marca} {preventivo.modello}</div>
                          <small className="text-muted">{preventivo.tipoVeicolo === 'auto' ? '🚗' : '🏍️'} {preventivo.anno}</small>
                        </td>
                        <td>
                          {preventivo.tipoIntervento && preventivo.tipoIntervento.length > 0 ? (
                            <span className="tipo-intervento-badge">
                              {preventivo.tipoIntervento[0]}
                              {preventivo.tipoIntervento.length > 1 && ` +${preventivo.tipoIntervento.length - 1}`}
                            </span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>{formatDate(preventivo.createdAt)}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(preventivo.status)}`}>
                            {preventivo.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <Link to={`/preventivi/${preventivo._id}`} className="action-button view-button">
                            <VisibilityIcon />
                          </Link>
                          <button
                            onClick={() => handleDeletePreventivo(preventivo._id)}
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
                        Nessuna richiesta di preventivo trovata
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

export default PreventiviList;