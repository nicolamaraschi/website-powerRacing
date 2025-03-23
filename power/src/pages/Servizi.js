import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Servizi.css';

const Servizi = () => {
  // Stato per gestire il servizio attualmente visualizzato in dettaglio
  const [activeServiceId, setActiveServiceId] = useState(null);

  // Array con i servizi offerti
  const services = [
    {
      id: 1,
      title: "Preparazioni Sportive",
      icon: "🏎️",
      shortDesc: "Elaborazioni e messe a punto per ottenere prestazioni superiori dal tuo veicolo.",
      longDesc: "Il nostro reparto preparazioni sportive è il cuore pulsante dell'azienda, dove la nostra passione per le competizioni si trasforma in soluzioni tecniche avanzate per migliorare le prestazioni della tua auto. Ogni intervento è personalizzato in base alle esigenze del cliente e alle caratteristiche del veicolo.",
      features: [
        "Centraline elettroniche B. personalizzate",
        "Centraline D. programmate su misura",
        "Filtri aria sportivi (K&N, H&M, Sparco)",
        "Scarichi sportivi (Laser, Sebring, Tuner)",
        "Impianti frenanti migliorati (Mintex, Ferodo R., Braking)",
        "Distanziali (Runner) per una migliore tenuta",
        "Alberi a camme ottimizzati",
        "Assetti sportivi personalizzati",
        "Molle specifiche (H&R, G&M, Eibach, Fedem)",
        "Ammortizzatori performanti (Koni, G&M, Bilstein)"
      ],
      image: "/preparazioni.jpeg"
    },
    {
      id: 2,
      title: "Tagliandi Auto Benzina e Diesel",
      icon: "🔧",
      shortDesc: "Manutenzione programmata completa per mantenere la tua auto in condizioni ottimali.",
      longDesc: "La manutenzione periodica è fondamentale per garantire durata e affidabilità al tuo veicolo. Il nostro team di tecnici qualificati esegue tagliandi completi seguendo le specifiche del costruttore, utilizzando ricambi originali o di qualità equivalente e lubrificanti delle migliori marche.",
      features: [
        "Controllo e sostituzione pattini e dischi freno",
        "Sostituzione filtri aria, olio, carburante e abitacolo",
        "Olio motore premium (Fuchs, Agip, Elf)",
        "Collaudo veicolo in strada post intervento",
        "Controllo e sostituzioni candele e candelette",
        "Verifica e rabbocco liquidi (freni, raffreddamento, servosterzo)",
        "Controllo cinghie e distribuzione",
        "Diagnostica elettronica completa",
        "Reset spie manutenzione",
        "Controllo sistemi di sicurezza"
      ],
      image: "/tagliando.jpeg"
    },
    {
      id: 3,
      title: "Impianti Stereo",
      icon: "🔊",
      shortDesc: "Sistemi audio personalizzati per un'esperienza sonora superiore nella tua auto.",
      longDesc: "Trasforma l'esperienza di ascolto nella tua auto con i nostri impianti stereo personalizzati. Dalla semplice sostituzione dell'autoradio di serie all'installazione di sistemi audio completi ad alta fedeltà, i nostri tecnici specializzati ti garantiscono un'installazione professionale e un suono eccezionale.",
      features: [
        "Accessori e componentistica audio di qualità",
        "Comandi al volante integrati",
        "Caricatori CD e interfacce multimediali",
        "Kit vivavoce e connettività Bluetooth",
        "Altoparlanti di alta qualità",
        "Subwoofer per bassi profondi e definiti",
        "Equalizzatori e processori audio",
        "Amplificatori per una potenza sonora superiore",
        "Autoradio: sintolettori CD e sistemi multimediali",
        "Integrazioni con smartphone e dispositivi digitali"
      ],
      image: "/stereo.jpeg"
    },
    {
      id: 4,
      title: "Assistenza A/C e Climatizzatori",
      icon: "🌬️",
      shortDesc: "Servizio completo per il tuo sistema di climatizzazione, dalla manutenzione alla ricarica.",
      longDesc: "Un sistema di climatizzazione efficiente è essenziale per il comfort di guida e per la tua salute. Il nostro servizio di assistenza per aria condizionata e climatizzatori garantisce prestazioni ottimali in ogni stagione, migliorando il comfort e riducendo i consumi di carburante.",
      features: [
        "Manutenzione programmata dell'impianto",
        "Sostituzione filtri abitacolo standard e ai carboni attivi",
        "Ricarica gas refrigerante con recupero",
        "Verifica perdite con tracciante UV",
        "Sanificazione dell'impianto",
        "Sostituzione compressori",
        "Riparazione e sostituzione condotti",
        "Controllo pressioni di esercizio",
        "Diagnosi computerizzata",
        "Eliminazione cattivi odori"
      ],
      image: "/climatizzatore.jpeg"
    },
    {
      id: 5,
      title: "Assistenza e Sostituzione Pneumatici",
      icon: "🚗",
      shortDesc: "Servizio completo per pneumatici, dall'equilibratura alla sostituzione con le migliori marche.",
      longDesc: "Gli pneumatici sono l'unico punto di contatto tra il veicolo e la strada, quindi sono fondamentali per sicurezza e prestazioni. Offriamo un servizio completo che include consulenza nella scelta degli pneumatici più adatti alle tue esigenze, montaggio, equilibratura e allineamento, garantendo sicurezza e comfort di guida.",
      features: [
        "Riparazione tubeless professionale",
        "Secur-Pneus (miscela inerte per gonfiaggio)",
        "Convergenza ed equilibratura elettronica",
        "Pneumatici di tutte le marche premium (Michelin, Pirelli, Dunlop, Yokohama, Bridgestone)",
        "Consulenza personalizzata per ogni tipo di guida",
        "Controllo pressione e usura",
        "Rotazione pneumatici",
        "Stoccaggio stagionale pneumatici",
        "Montaggio pneumatici run-flat",
        "Valvole TPMS e sensori di pressione"
      ],
      image: "/pneumatici.jpeg"
    },
    {
      id: 6,
      title: "Centro Revisioni",
      icon: "🔍",
      shortDesc: "Revisioni ministeriali per auto e moto, autorizzati MCTC con concessione n.428.",
      longDesc: "Come centro revisioni autorizzato dalla Motorizzazione Civile (concessione n.428 del 11.12.2006), effettuiamo revisioni periodiche obbligatorie per tutti i veicoli a motore. Le nostre moderne attrezzature e il personale qualificato garantiscono controlli accurati di tutti i sistemi di sicurezza e delle emissioni, nel rispetto delle normative vigenti.",
      features: [
        "Revisione periodica veicoli fino a 3500 kg",
        "Revisione motocicli e ciclomotori",
        "Test emissioni benzina e diesel",
        "Controllo efficienza impianto frenante",
        "Verifica sospensioni e ammortizzatori",
        "Controllo allineamento fari",
        "Ispezione sottoscocca",
        "Verifica sistemi di sicurezza",
        "Controllo carreggiata",
        "Pre-revisione gratuita"
      ],
      image: "/revisione.jpeg"
    }
  ];

  // Array di società di leasing convenzionate
  const leasingCompanies = [
    "ARVAL", "LEASEPLAN ITALIA", "EUROPE CAR", "CAR SERVER", 
    "LEASY RENT", "LOCAT RENT", "MERCEDES BENZ CHARTERIVAY", 
    "MERCEDES BENZ RENTAL", "PROGRAMMA DI AUTONOLEGGIO FIORENTINO", 
    "SAVARENT", "VOLKSWAGEN LEASING", "DRIVE SERVICE"
  ];

  // Funzione per mostrare/nascondere i dettagli di un servizio
  const toggleServiceDetails = (serviceId) => {
    if (activeServiceId === serviceId) {
      setActiveServiceId(null); // Chiudi se già aperto
    } else {
      setActiveServiceId(serviceId); // Apri il nuovo servizio
    }
  };

  return (
    <div className="servizi-page">
      {/* Hero Section */}
      <div className="servizi-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1>I Nostri Servizi</h1>
              <p className="lead">
                Assistenza completa e professionale per la tua auto
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        {/* Intro Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-title">Il Nostro Modo di Lavorare</h2>
            <p className="mb-4">
              Abbiamo a disposizione le migliori attrezzature e un personale efficiente e preparato per risolvere nel più breve tempo possibile ogni problema e per darvi l'assistenza più completa. 
              L'elenco qui sotto è solo uno schema semplificato di tutti i nostri servizi. Se avete qualche domanda particolare, siamo sempre a vostra disposizione per qualsiasi informazione.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row mb-5">
          {services.map((service) => (
            <div className="col-lg-4 col-md-6 mb-4" key={service.id}>
              <div className="service-card">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
                
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="service-image" 
                />
                
                <div className="service-content">
                  <p>{service.shortDesc}</p>
                  
                  <button 
                    className={`service-details-toggle ${activeServiceId === service.id ? 'active' : ''}`}
                    onClick={() => toggleServiceDetails(service.id)}
                  >
                    {activeServiceId === service.id ? 'Mostra Meno' : 'Scopri di Più'}
                  </button>
                  
                  {activeServiceId === service.id && (
                    <div className="service-details">
                      <p className="service-long-desc">{service.longDesc}</p>
                      <h4>Cosa Offriamo:</h4>
                      <ul className="service-features">
                        {service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <div className="text-center mt-4">
                        <Link to="/contatti" className="btn btn-outline-primary">
                          Richiedi Informazioni
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leasing Companies Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="leasing-companies-section">
              <h2 className="section-title text-center mb-4">Convenzioni con Società di Leasing</h2>
              <p className="text-center mb-4">
                Siamo convenzionati con le principali società di leasing e noleggio auto, offrendo tariffe e servizi dedicati:
              </p>
              
              <div className="leasing-companies-grid">
                {leasingCompanies.map((company, index) => (
                  <div key={index} className="leasing-company-card">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="cta-section text-center">
              <h2>Hai bisogno di un servizio specifico?</h2>
              <p className="lead mb-4">
                Contattaci subito per un preventivo gratuito o per maggiori informazioni
              </p>
              <div className="cta-buttons">
                <Link to="/contatti" className="btn btn-primary btn-lg me-3">
                  Contattaci
                </Link>
                <a href="tel:+390248302847" className="btn btn-outline-primary btn-lg">
                  Chiamaci Ora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servizi;