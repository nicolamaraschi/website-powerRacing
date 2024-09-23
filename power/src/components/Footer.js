import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link per navigazione interna
import './Footer.css'; // Importa il CSS personalizzato

const Footer = () => {
  return (
    <footer className="bg-light text-dark mt-4 py-4">
      <div className="container">
        <div className="row">
          {/* Sezione Navigazione */}
          <div className="col-md-3 mb-3">
            <h5>🔗 Link</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark">🏠 Home</Link></li>
              <li><Link to="/chisiamo" className="text-dark">ℹ️ Chi siamo</Link></li>
              <li><Link to="/servizi" className="text-dark">🛠️ Servizi</Link></li>
              <li><Link to="/vetrina" className="text-dark">🚗 Vetrina usato</Link></li>
              <li><Link to="/link" className="text-dark">🔗 Link</Link></li>
              <li><Link to="/contatti" className="text-dark">✉️ Contatti</Link></li>
            </ul>
          </div>

          {/* Sezione Contatto */}
          <div className="col-md-3 mb-3">
            <h5>📞 Contatti</h5>
            <p>🏢 Power Racing Srl</p>
            <p>📍 Via Gonin, 11, 20147 Milano</p>
            <p>📞 Tel: +39.02.48302847 r.a.</p>
            <p>📠 Fax: +39.02.48376177</p>
            <p>✉️ Email: <a href="mailto:info@powerracing.it" className="text-dark">info@powerracing.it</a></p>
            <p>✉️ Email: <a href="mailto:bluecarmilano@yahoo.it" className="text-dark">bluecarmilano@yahoo.it</a></p>
            <p>📱 Cell: +39 347 467 0595</p>
          </div>

          {/* Sezione Orari */}
          <div className="col-md-3 mb-3">
            <h5>🕒 Orari</h5>
            <p>🗓️ Lun-Ven: 8:30/12:30 14:00/18:30</p>
            <p>🗓️ Sabato: 8:30 - 12:30</p>
          </div>

          {/* Sezione Copyright */}
          <div className="col-md-3 mb-3">
            <h5>📲 Seguici</h5>
            <p>&copy; 2024 Power Racing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
