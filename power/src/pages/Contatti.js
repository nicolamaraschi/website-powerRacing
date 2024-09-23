import React from 'react';
import './Contatti.css'; // Importa il CSS personalizzato

const Contatti = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">📞 Contatti</h1>
      <div className="row">
        {/* Info Contatti */}
        <div className="col-md-6 mb-4">
          <div className="contact-info">
            <h3>🏢 Power Racing Srl</h3>
            <p>📍 Via Gonin, 11</p>
            <p>🏙️ 20147 - Milano</p>
            <p>📞 Tel: +39.02.48302847 r.a.</p>
            <p>📠 Fax: +39.02.48376177</p>
            <p>✉️ Email: <a href="mailto:info@powerracing.it">info@powerracing.it</a></p>
            <p>✉️ Email: <a href="mailto:bluecarmilano@yahoo.it">bluecarmilano@yahoo.it</a></p>
            <p>📱 Cell: +39 347 467 0595</p>
          </div>
        </div>

        {/* Orari */}
        <div className="col-md-6 mb-4">
          <div className="hours-info">
            <h3>🕒 Orari</h3>
            <p>📅 Lun-Ven: 8:30/12:30 14:00/18:30</p>
            <p>📅 Sabato: 8:30 - 12:30</p>
          </div>
        </div>
      </div>

      {/* Mappa OpenStreetMap con Marker */}
      <div className="mb-4">
        <h3>🗺️ Come Raggiungerci</h3>
        <div className="map-container">
          <iframe
            title="Mappa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=9.155508518218994%2C45.43615760807982%2C9.16021609210968%2C45.438163679120426&layer=mapnik&marker=45.437161,9.157862"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Modulo di Contatto */}
      <div className="contact-form">
        <h3>💬 Invia un Messaggio</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">👤 Nome</label>
            <input type="text" className="form-control" id="name" placeholder="Il tuo nome" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input type="email" className="form-control" id="email" placeholder="La tua email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">📝 Messaggio</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Il tuo messaggio" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">📨 Invia</button>
        </form>
      </div>
    </div>
  );
};

export default Contatti;
