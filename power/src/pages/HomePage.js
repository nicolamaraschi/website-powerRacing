import React from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './HomePage.css';

const HomePage = () => {
  // Timeline events
  const events = [
    { 
      year: 1980, 
      title: 'Fondazione del primo team', 
      description: 'Il fondatore avvia l\'attività sia in officina con Autofficina Rally Gomme che sui campi di gara con la Formula Fiat Abarth.',
      image: '/timeline1.jpeg'
    },
    { 
      year: 1992, 
      title: 'Primi successi nel Campionato Italiano Renault Clio', 
      description: 'I risultati iniziano a farsi notare nel campionato nazionale.',
      image: '/timeline2.jpeg'
    },
    { 
      year: 1994, 
      title: 'Vittorie nelle categorie Preparatori e Squadre', 
      description: 'Riconoscimenti significativi nelle gare e nelle competizioni ufficiali.',
      image: '/timeline3.jpeg'
    },
    { 
      year: 1996, 
      title: 'Debutto nella Formula Renault Elf Campus', 
      description: 'Inizio della preparazione dei motori per competizioni ufficiali e nel Campionato Mégane Elf Sport Cup.',
      image: '/timeline4.jpeg'
    },
    { 
      year: 1998, 
      title: 'Riorganizzazione dell\'officina', 
      description: 'Nascita di Power Racing con due ampie strutture dedicate a officina e preparazione motori.',
      image: '/timeline5.jpeg'
    },
    { 
      year: 2006, 
      title: 'Centro Revisioni Autorizzato', 
      description: 'Ottenimento della concessione MCTC n.428 per revisioni auto e moto.',
      image: '/timeline6.jpeg'
    },
    { 
      year: 2022, 
      title: 'Power Racing Oggi', 
      description: 'Oltre 40 anni di esperienza e professionalità al servizio dei clienti.',
      image: '/logo.png'
    },
  ];

  // Team members
  const teamMembers = [
    {
      name: "Bruno",
      role: "Meccanico Specializzato",
      description: "Revisione totale del motore",
      image: "/team/bruno.jpg"
    },
    {
      name: "Nello",
      role: "Collaboratore Tecnico",
      description: "Supporto alla meccanica",
      image: "/team/nello.jpg"
    },
    {
      name: "Michele",
      role: "Gommista",
      description: "Pneumatici e assetti",
      image: "/team/michele.jpg"
    },
    {
      name: "Andrea",
      role: "Tecnico Revisioni",
      description: "Revisioni ministeriali",
      image: "/team/andrea.jpg"
    },
    {
      name: "Manuel",
      role: "Elettrauto",
      description: "Sistemi elettrici ed elettronici",
      image: "/team/manuel.jpg"
    },
    {
      name: "Davide",
      role: "Meccanico",
      description: "Tagliandi completi",
      image: "/team/davide.jpg"
    },
    {
      name: "Monica",
      role: "Amministrazione",
      description: "Ufficio",
      image: "/team/monica.jpg"
    },
    {
      name: "Barbara",
      role: "Amministrazione",
      description: "Ufficio",
      image: "/team/barbara.jpg"
    }
  ];

  // Services
  const services = [
    {
      title: "Officina Specializzata",
      description: "Riparazioni, manutenzioni e tagliandi per ogni marca e modello con attrezzature all'avanguardia.",
      icon: "tools",
      features: [
        "Reparto elettronica con diagnosi computerizzata",
        "Stazioni di ricarica e assistenza climatizzatori",
        "Attrezzatura generica, specifica e di precisione",
        "Quattro auto di cortesia a disposizione"
      ]
    },
    {
      title: "Preparazioni Sportive",
      description: "Elaborazioni e messe a punto per massimizzare le prestazioni del tuo veicolo con soluzioni personalizzate.",
      icon: "speedometer2",
      features: [
        "Centraline personalizzate",
        "Scarichi sportivi e sistemi di aspirazione",
        "Impianti frenanti performanti",
        "Assetti sportivi calibrati"
      ]
    },
    {
      title: "Centro Revisioni",
      description: "Centro revisioni autorizzato MCTC per auto e moto con controlli completi e dettagliati.",
      icon: "award",
      features: [
        "Revisione periodica mezzi inferiori ai 3500 kg",
        "Revisione motocicli autorizzata",
        "Concessione n.428 del 11.12.2006 della M.C.T.C.",
        "Attrezzature certificate e personale qualificato"
      ]
    }
  ];

  return (
    <div className="home-page">
      {/* Video Hero Section */}
      <div className="video-hero-section">
        <video autoPlay muted loop className="hero-video">
          <source src="/video.mp4" type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto text-center">
                <div className="hero-logo-container">
                  <h1 className="hero-title">POWER RACING</h1>
                  <div className="hero-subtitle">OFFICINA & PREPARAZIONE MOTORI</div>
                </div>
                <p className="hero-tagline">Passione e Professionalità dal 1980</p>
                <div className="hero-buttons">
                  <Link to="/servizi" className="btn btn-primary btn-lg mx-2">
                    I Nostri Servizi
                  </Link>
                  <Link to="/contatti" className="btn btn-outline-light btn-lg mx-2">
                    Contattaci
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>Scorri per scoprire</span>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="section-title">Chi Siamo</h2>
              <p className="lead">
                L'esperienza e la professionalità di Power Racing hanno più di 40 anni di storia.
              </p>
              <p>
                Fin dal 1980, il nostro fondatore ha profuso tutto il suo impegno sia in officina che sui campi di gara, 
                raccogliendo importanti riconoscimenti nel mondo delle competizioni automobilistiche e nella riparazione 
                di veicoli di ogni tipo.
              </p>
              <p>
                Oggi Power Racing rappresenta un punto di riferimento a Milano per chi cerca assistenza qualificata, 
                competenza tecnica e passione per i motori. La nostra filosofia è semplice: fornire servizi di altissima 
                qualità, utilizzando attrezzature all'avanguardia e mettendo al centro la soddisfazione del cliente.
              </p>
            </div>
            <div className="col-md-6">
              <div className="about-image-container">
                <img src="/logo.png" alt="Power Racing" className="img-fluid rounded shadow" />
                <div className="experience-badge">
                  <span>40+</span>
                  <span>anni di esperienza</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">I Nostri Servizi</h2>
            <p className="text-muted">
              Offriamo una gamma completa di servizi per la tua auto
            </p>
          </div>
          
          <div className="row">
            {services.map((service, index) => (
              <div className="col-lg-4 mb-4" key={index}>
                <div className="service-card h-100">
                  <div className="service-icon">
                    <i className={`bi bi-${service.icon}`}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}><i className="bi bi-check-circle-fill me-2"></i>{feature}</li>
                    ))}
                  </ul>
                  <Link to="/servizi" className="btn btn-outline-primary mt-3">
                    Scopri di più
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">La Nostra Storia</h2>
            <p className="text-muted">
              Un percorso di successi ed evoluzione dal 1980 ad oggi
            </p>
          </div>
          
          <VerticalTimeline>
            {events.map((event, index) => (
              <VerticalTimelineElement
                key={index}
                date={event.year}
                iconStyle={{ background: '#007bff', color: '#fff' }}
                icon={<i className="bi bi-calendar-event"></i>}
              >
                <h3 className="vertical-timeline-element-title">{event.title}</h3>
                <p>{event.description}</p>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="timeline-image img-fluid mt-3 rounded" 
                />
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </section>

      {/* Facility Section */}
      <section className="facility-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Le Nostre Strutture</h2>
            <p className="text-muted">
              Attrezzature moderne e spazi dedicati per ogni tipo di intervento
            </p>
          </div>
          
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img src="/officina.webp" alt="Autofficina" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6">
              <h3>Autofficina</h3>
              <p>
                La nostra officina è equipaggiata con le più moderne attrezzature per garantire interventi 
                di alta qualità su ogni tipo di veicolo.
              </p>
              <ul className="facility-features">
                <li><i className="bi bi-laptop me-2"></i>Reparto elettronica con computer diagnostici</li>
                <li><i className="bi bi-snow me-2"></i>Stazioni di ricarica condizionatori</li>
                <li><i className="bi bi-wrench-adjustable me-2"></i>Attrezzatura specifica e di precisione</li>
                <li><i className="bi bi-car-front me-2"></i>Auto di cortesia disponibili</li>
                <li><i className="bi bi-tools me-2"></i>Ponti sollevatori di nuova generazione</li>
              </ul>
            </div>
          </div>
          
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-6">
              <img src="/elaborazione.webp" alt="Preparazione Motori" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6">
              <h3>Preparazione Motori</h3>
              <p>
                Il reparto dedicato alla preparazione motori è dove la passione per le competizioni 
                si trasforma in prestazioni superiori per il tuo veicolo.
              </p>
              <ul className="facility-features">
                <li><i className="bi bi-speedometer me-2"></i>Banco prova per verifiche prestazionali</li>
                <li><i className="bi bi-gear-wide-connected me-2"></i>Reparto pneumatici con bilanciatrice elettronica</li>
                <li><i className="bi bi-tools me-2"></i>Strumentazione di precisione per turbine e centraline</li>
                <li><i className="bi bi-fuel-pump me-2"></i>Elaborazione sistemi di alimentazione</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Il Nostro Team</h2>
            <p className="text-muted">
              Professionisti qualificati al tuo servizio
            </p>
          </div>
          
          <div className="row">
            {teamMembers.map((member, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                <div className="team-card">
                  <div className="team-img-container">
                    <img 
                      src={member.image || "/team-placeholder.jpg"} 
                      alt={member.name} 
                      className="img-fluid" 
                    />
                  </div>
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                    <p className="team-desc">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Certificazioni e Autorizzazioni</h2>
            <p className="text-muted">
              La qualità del nostro lavoro è garantita e certificata
            </p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="cert-card text-center">
                <div className="cert-icon">
                  <i className="bi bi-award"></i>
                </div>
                <h4>Centro Revisioni Autorizzato</h4>
                <p>Concessione n.428 del 11.12.2006 della Motorizzazione Civile</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="cert-card text-center">
                <div className="cert-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h4>Sicurezza Garantita</h4>
                <p>Procedure certificate e personale qualificato per ogni intervento</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="cert-card text-center">
                <div className="cert-icon">
                  <i className="bi bi-hand-thumbs-up"></i>
                </div>
                <h4>Partner Ufficiale</h4>
                <p>Collaborazioni con le principali società di leasing e noleggio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>Pronto a scoprire l'eccellenza di Power Racing?</h2>
              <p className="lead mb-4">
                Contattaci oggi stesso per un appuntamento o per maggiori informazioni
              </p>
              <div className="cta-buttons">
                <Link to="/contatti" className="btn btn-primary btn-lg me-3">
                  <i className="bi bi-envelope me-2"></i> Contattaci
                </Link>
                <a href="tel:+390248302847" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-telephone me-2"></i> Chiamaci Ora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;