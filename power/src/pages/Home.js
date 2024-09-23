// src/pages/ExternalPage.js
import React from 'react';
import './Home.css'; // Importa il CSS
const ExternalPage = () => {
  return (
    <div className="external-page container mt-4">
      <h1 className="text-center mb-4">Visita il Nostro Partner</h1>
      <div className="iframe-container">
        <iframe
          src="https://www.orologeriarovighi.com/"
          title="Orologeria Rovighi"
          width="100%"
          height="800px"
          frameBorder="0"
          allowFullScreen
          className="iframe"
        />
      </div>
    </div>
  );
};

export default ExternalPage;
