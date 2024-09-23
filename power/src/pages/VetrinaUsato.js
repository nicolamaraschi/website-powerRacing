import React, { useEffect, useState } from 'react';
import './VetrinaUsato.css'; // Importa il CSS personalizzato

const VetrinaUsato = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/cars.json')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">🚗 Auto Usate in Vendita</h1>
      <div className="row">
        {cars.map((car, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img src={car.image} className="card-img-top" alt={car.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{car.title} 🚘</h5>
                <p className="card-text text-muted">{car.description}</p>
                <ul className="list-unstyled mb-4">
                  <li><strong>🛣️ Chilometraggio:</strong> {car.mileage}</li>
                  <li><strong>📅 Anno:</strong> {car.year}</li>
                  <li><strong>💰 Prezzo:</strong> {car.price}</li>
                </ul>
                <button className="btn btn-primary mt-auto" onClick={() => alert('Mostra dettagli auto')}>
                  🧐 Dettagli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetrinaUsato;
