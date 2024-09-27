import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img 
          src="/logo.png" 
          alt="Power Racing Logo" 
          style={{ height: '100px' }} // Imposta l'altezza desiderata per il logo
        />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto"> {/* Aggiungi mx-auto per centrare */}
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chisiamo">Chi siamo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/servizi">Servizi</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vetrina">Vetrina usato</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/link">Link</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contatti">Contatti</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
