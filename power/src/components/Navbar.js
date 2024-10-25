import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <li className="nav-item active">
            <Link className="nav-link" to="/" onClick={handleLinkClick}>
              🏠 Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chisiamo" onClick={handleLinkClick}>
              👥 Chi siamo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/servizi" onClick={handleLinkClick}>
              💼 Servizi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vetrina" onClick={handleLinkClick}>
              🚗 Vetrina usato
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/link" onClick={handleLinkClick}>
              🔗 Link
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contatti" onClick={handleLinkClick}>
              📞 Contatti
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;