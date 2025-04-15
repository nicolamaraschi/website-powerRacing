import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Nome dell'azienda come link */}
      <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
        POWER RACING
      </Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={handleToggle} 
        aria-controls="navbarNav" 
        aria-expanded={isOpen} 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              to="/" 
              onClick={handleLinkClick}
            >
              🏠 Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          {/* La voce "Chi siamo" è stata rimossa, dato che ora è parte della Home */}
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/servizi' ? 'active' : ''}`}
              to="/servizi" 
              onClick={handleLinkClick}
            >
              💼 Servizi
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/vetrina' ? 'active' : ''}`}
              to="/vetrina" 
              onClick={handleLinkClick}
            >
              🚗 Vetrina usato
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/link' ? 'active' : ''}`}
              to="/link" 
              onClick={handleLinkClick}
            >
              🔗 Link
            </Link>
          </li>
         
        <li className="nav-item">
          <Link 
            className={`nav-link ${location.pathname === '/richiedi-preventivo' ? 'active' : ''}`}
            to="/richiedi-preventivo" 
            onClick={handleLinkClick}
          >
            🔧 Richiedi Preventivo
          </Link>
        </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/contatti' ? 'active' : ''}`}
              to="/contatti" 
              onClick={handleLinkClick}
            >
              📞 Contatti
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;