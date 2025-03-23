import React from 'react';

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* Hero Background with Overlay */}
      <div className="hero-background" style={{ 
        backgroundImage: 'url(/hero-background.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        position: 'relative'
      }}>
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}></div>

        {/* Hero Content */}
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center text-white">
              <h1 className="display-3 font-weight-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                POWER RACING
              </h1>
              <p className="lead" style={{ fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
                Passione e Professionalità dal 1980
              </p>
              <div className="mt-4">
                <a href="/servizi" className="btn btn-primary btn-lg mx-2 px-4">
                  I Nostri Servizi
                </a>
                <a href="/vetrina" className="btn btn-outline-light btn-lg mx-2 px-4">
                  Vetrina Auto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Boxes Below Hero */}
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-tools" style={{ fontSize: '2.5rem', color: '#007bff' }}></i>
                </div>
                <h3 className="h4 mb-3">Officina Specializzata</h3>
                <p className="text-muted">
                  Riparazioni, manutenzioni e tagliandi per ogni marca e modello con attrezzature all'avanguardia.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-car" style={{ fontSize: '2.5rem', color: '#007bff' }}></i>
                </div>
                <h3 className="h4 mb-3">Preparazioni Sportive</h3>
                <p className="text-muted">
                  Elaborazioni e messe a punto per massimizzare le prestazioni del tuo veicolo con soluzioni personalizzate.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-check-circle" style={{ fontSize: '2.5rem', color: '#007bff' }}></i>
                </div>
                <h3 className="h4 mb-3">Centro Revisioni</h3>
                <p className="text-muted">
                  Centro revisioni autorizzato MCTC per auto e moto con controlli completi e dettagliati del veicolo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
