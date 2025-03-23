import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChiSiamo.css';

const ChiSiamo = () => {
  // Array di membri del team con informazioni estese
  const teamMembers = [
    {
      name: "Bruno",
      role: "Meccanico Specializzato",
      description: "Tecnico con oltre 25 anni di esperienza nella revisione completa dei motori. Specializzato in motori ad alte prestazioni.",
      skills: ["Revisione Motori", "Meccanica Complessa", "Sistemi di Iniezione"],
      image: "/team/bruno.jpg"
    },
    {
      name: "Nello",
      role: "Tecnico Meccanico",
      description: "Collaboratore di Bruno, si occupa della meccanica generale e assemblaggi di precisione.",
      skills: ["Assemblaggi", "Diagnostica Meccanica", "Revisioni"],
      image: "/team/nello.jpg"
    },
    {
      name: "Michele",
      role: "Gommista Specializzato",
      description: "Esperto nell'equilibratura, convergenza e scelta degli pneumatici adatti ad ogni veicolo e stile di guida.",
      skills: ["Equilibratura", "Convergenza", "Consulenza Pneumatici"],
      image: "/team/michele.jpg"
    },
    {
      name: "Andrea",
      role: "Tecnico Revisioni",
      description: "Responsabile del reparto revisioni ministeriali, garantisce che tutti i veicoli siano conformi agli standard di sicurezza e ambientali.",
      skills: ["Revisioni Ministeriali", "Controlli Emissioni", "Normative di Sicurezza"],
      image: "/team/andrea.jpg"
    },
    {
      name: "Manuel",
      role: "Elettrauto",
      description: "Specializzato nei sistemi elettrici ed elettronici, si occupa di diagnosi computerizzate e riparazioni complesse.",
      skills: ["Diagnostica Elettronica", "Impianti Elettrici", "Centraline"],
      image: "/team/manuel.jpg"
    },
    {
      name: "Davide",
      role: "Meccanico",
      description: "Tecnico con focus sui tagliandi completi e manutenzione programmata, garantisce l'efficienza e la durata dei veicoli.",
      skills: ["Tagliandi", "Manutenzione", "Sistemi Frenanti"],
      image: "/team/davide.jpg"
    },
    {
      name: "Monica",
      role: "Responsabile Amministrativa",
      description: "Gestisce l'amministrazione dell'officina, inclusi gli aspetti contabili e le relazioni con i clienti.",
      skills: ["Amministrazione", "Contabilità", "Gestione Clienti"],
      image: "/team/monica.jpg"
    },
    {
      name: "Barbara",
      role: "Assistente Ufficio",
      description: "Si occupa della pianificazione degli appuntamenti, dell'accoglienza clienti e della gestione documentale.",
      skills: ["Pianificazione", "Accoglienza", "Gestione Documenti"],
      image: "/team/barbara.jpg"
    }
  ];

  // Timeline con eventi importanti della storia aziendale
  const timelineEvents = [
    {
      year: 1980,
      title: "Fondazione",
      description: "Nasce l'Autofficina Rally Gomme, primo nucleo della futura Power Racing."
    },
    {
      year: 1985,
      title: "Prime Competizioni",
      description: "Partecipazione alle prime gare con la Formula Fiat Abarth."
    },
    {
      year: 1992,
      title: "Espansione",
      description: "Ingresso nel Campionato Italiano Renault Clio con i primi importanti successi."
    },
    {
      year: 1994,
      title: "Primi Riconoscimenti",
      description: "Vittorie nelle categorie Preparatori e Squadre, affermandosi nel panorama nazionale."
    },
    {
      year: 1996,
      title: "Evoluzione",
      description: "Debutto del reparto motori nella Formula Renault Elf Campus e nel Campionato Mégane Elf Sport Cup."
    },
    {
      year: 1998,
      title: "Struttura Attuale",
      description: "Nasce Power Racing Srl con due strutture separate per officina e preparazione motori."
    },
    {
      year: 2005,
      title: "Espansione Servizi",
      description: "Introduzione del centro revisioni ministeriale e modernizzazione delle attrezzature."
    },
    {
      year: 2012,
      title: "Innovazione Tecnologica",
      description: "Implementazione di sistemi diagnostici avanzati e formazione specialistica del team."
    },
    {
      year: 2022,
      title: "Oggi",
      description: "Power Racing continua a combinare tradizione e innovazione, offrendo servizi d'eccellenza."
    }
  ];

  // Riconoscimenti e certificazioni
  const certifications = [
    {
      title: "Centro Revisioni Autorizzato MCTC",
      description: "Concessione n.428 del 11.12.2006 della Motorizzazione Civile",
      icon: "bi-award"
    },
    {
      title: "Certificazione ISO 9001",
      description: "Sistema di gestione per la qualità",
      icon: "bi-check-circle"
    },
    {
      title: "Partner Tecnico Ufficiale",
      description: "Collaborazioni con case automobilistiche premium",
      icon: "bi-star"
    }
  ];

  return (
    <div className="chi-siamo-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1>La Nostra Storia</h1>
              <p className="lead">
                Dal 1980, Power Racing rappresenta eccellenza e professionalità nel mondo dell'automotive
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {/* Mission & Vision */}
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="mission-card">
              <div className="card-icon">
                <i className="bi bi-bullseye"></i>
              </div>
              <h2>La Nostra Missione</h2>
              <p>
                Offriamo ai nostri clienti servizi di assistenza automobilistica di altissima qualità, 
                combinando l'esperienza del nostro team con le tecnologie più avanzate. 
                Ci impegniamo per garantire affidabilità, trasparenza e risultati eccellenti in ogni intervento.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="vision-card">
              <div className="card-icon">
                <i className="bi bi-eye"></i>
              </div>
              <h2>La Nostra Visione</h2>
              <p>
                Aspiriamo a essere un punto di riferimento nel settore automotive, 
                innovando costantemente i nostri servizi e mantenendo sempre al centro 
                la soddisfazione del cliente e la passione per i motori che ci ha guidato fin dall'inizio.
              </p>
            </div>
          </div>
        </div>

        {/* Storia dell'azienda */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="section-header text-center">
              <h2 className="underline-title">La Nostra Storia</h2>
              <p className="lead mb-5">
                L'esperienza e la professionalità di Power Racing hanno più di 40 anni di storia
              </p>
            </div>
            
            <div className="timeline">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-badge">{event.year}</div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>{event.title}</h4>
                    </div>
                    <div className="timeline-body">
                      <p>{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Autofficina */}
        <div className="row mb-5 service-section align-items-center">
          <div className="col-md-6">
            <img 
              src="/officina.webp" 
              alt="Autofficina Power Racing" 
              className="img-fluid rounded-4 shadow-lg" 
            />
          </div>
          <div className="col-md-6">
            <h2 className="section-title">Autofficina</h2>
            <p className="lead mb-4">
              La nostra officina è equipaggiata con tecnologie all'avanguardia per offrire un servizio completo e professionale.
            </p>
            <div className="row">
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-cpu"></i>
                  <h5>Reparto Elettronica</h5>
                  <p>Computer diagnostici per ogni tipo di auto, tester ABS e iniezione</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-snow"></i>
                  <h5>Climatizzatori</h5>
                  <p>Stazioni di ricarica e assistenza completa</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-tools"></i>
                  <h5>Attrezzatura Specifica</h5>
                  <p>Strumentazione di precisione per turbine e centraline</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-car-front"></i>
                  <h5>Auto di Cortesia</h5>
                  <p>Quattro auto disponibili per i nostri clienti</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preparazione Motori */}
        <div className="row mb-5 service-section align-items-center flex-md-row-reverse">
          <div className="col-md-6">
            <img 
              src="/elaborazione.webp" 
              alt="Preparazione Motori" 
              className="img-fluid rounded-4 shadow-lg" 
            />
          </div>
          <div className="col-md-6">
            <h2 className="section-title">Preparazione Motori</h2>
            <p className="lead mb-4">
              Il nostro reparto di preparazione motori combina esperienza e tecnologia per ottenere prestazioni ottimali.
            </p>
            <div className="row">
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-speedometer2"></i>
                  <h5>Banco Prova</h5>
                  <p>Revisione periodica per mezzi fino a 3500 kg e motocicli</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-gear-wide-connected"></i>
                  <h5>Elaborazioni</h5>
                  <p>Modifiche personalizzate per prestazioni superiori</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-fuel-pump"></i>
                  <h5>Sistemi Iniezione</h5>
                  <p>Ottimizzazione dei sistemi di alimentazione</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="feature-item">
                  <i className="bi bi-plugin"></i>
                  <h5>Centraline</h5>
                  <p>Riprogrammazione e personalizzazione</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="section-header text-center">
              <h2 className="underline-title">Il Nostro Team</h2>
              <p className="lead mb-5">
                L'esperienza e la professionalità del nostro team sono la chiave del successo di Power Racing
              </p>
            </div>
          </div>
          
          {teamMembers.map((member, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="team-card">
                <div className="member-image">
                  <img 
                    src={member.image || "/team/placeholder.jpg"} 
                    alt={member.name} 
                    className="img-fluid" 
                  />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-desc">{member.description}</p>
                  <div className="member-skills">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificazioni e Riconoscimenti */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="section-header text-center">
              <h2 className="underline-title">Certificazioni e Riconoscimenti</h2>
              <p className="lead mb-4">
                La qualità dei nostri servizi è garantita da certificazioni e collaborazioni prestigiose
              </p>
            </div>
          </div>
          
          {certifications.map((cert, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="certification-card">
                <div className="cert-icon">
                  <i className={`bi ${cert.icon}`}></i>
                </div>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="cta-section text-center">
              <h2>Pronti a scoprire la differenza Power Racing?</h2>
              <p className="lead mb-4">
                Contattaci oggi stesso per un preventivo gratuito o per prenotare un appuntamento
              </p>
              <div className="cta-buttons">
                <Link to="/contatti" className="btn btn-primary btn-lg me-3">
                  <i className="bi bi-envelope me-2"></i> Contattaci
                </Link>
                <a href="tel:+390248302847" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-telephone me-2"></i> Chiamaci
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiSiamo;