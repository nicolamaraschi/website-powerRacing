import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChiSiamo.css';

const ChiSiamo = () => {
  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-center mb-4">🔍 Per Conoscerci Meglio</h1>
          <p>
            L'esperienza e la professionalità di Power Racing hanno più di 20 anni di storia. Fin dal 1980, infatti, con la costituzione del primo team, il fondatore ha profuso tutto il suo impegno sia in officina (con la Autofficina Rally Gomme) che sui campi di gara con la Formula Fiat Abarth raccogliendo le prime grandi soddisfazioni. Dal 1992, poi, sono arrivati i primi successi anche nel Campionato Italiano Renault Clio. Gli ottimi risultati in pista e in officina hanno portato a conquistare vittorie assolute nelle gare e nelle categorie Preparatori e Squadre già nel 1994. Due anni dopo, nel 1996, il reparto di preparazione dei motori debutta nella Formula Renault Elf Campus e nel Campionato Mégane Elf Sport Cup. Dal 1998, infine, appare la nuova ragione sociale di autofficina che raggruppa due ampie strutture dove vengono curate separatamente l'officina e la preparazione dei motori.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 d-flex align-items-center">
          <img src="/officina.webp" alt="Autofficina" className="img-uniform" />
        </div>
        <div className="col-md-6">
          <h2>🔧 Autofficina</h2>
          <ul>
            <li>🖥️ Reparto elettronica con computer per ogni tipo di auto, diagnosi tester e ABS, attrezzatura per iniezione benzina e diesel sempre tutti aggiornati;</li>
            <li>🔋 Stazioni di ricarica condizionatori e assistenza climatizzatori;</li>
            <li>🛠️ Attrezzatura generica, specifica e di precisione;</li>
            <li>⚙️ Strumentazione di precisione per turbine e centraline;</li>
            <li>🚗 Quattro auto di cortesia;</li>
            <li>🔧 Ponti sollevatori di nuova generazione a scomparsa e per mezzi pesanti.</li>
          </ul>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 d-flex align-items-center">
          <img src="/elaborazione.webp" alt="Preparazione Motori" className="img-uniform" />
        </div>
        <div className="col-md-6">
          <h2>🏎️ Preparazione Motori</h2>
          <ul>
            <li>🔍 Banco per la revisione periodica dei mezzi inferiori ai 3500 kg, concessione n.428 del 11.12.2006 della M.C.T.C., + revisione motocicli; revisione motori;</li>
            <li>🔧 Reparto pneumatici con bilanciatrice elettronica, ponte per la convergenza e pluriennale esperienza per gli assetti e servizio SECUR PNEUS;</li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <img src="/team.jpeg" alt="Il nostro team" className="img-uniform" />
        </div>
        <div className="col-md-6">
          <h2>👥 Le Persone</h2>
          <p>Ed ecco il nostro team al completo. Tanto per iniziare a conoscerci un po ecco i nomi delle persone che lavorano per Power Racing e quello che possono fare per voi:</p>
          <ul>
            <li><strong>Bruno:</strong> 🔧 Meccanico specializzato alla revisione totale del motore.</li>
            <li><strong>Nello:</strong> 🤝 Collaboratore di Bruno.</li>
            <li><strong>Michele:</strong> 🛠️ Gommista, insieme ad Alessandro.</li>
            <li><strong>Andrea:</strong> 📋 Tecnico delle revisioni ministeriali.</li>
            <li><strong>Manuel:</strong> ⚡ Elettrauto.</li>
            <li><strong>Davide:</strong> 🔩 Meccanico per i tagliandi completi.</li>
            <li><strong>Monica e Barbara:</strong> 🖥️ Ufficio.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChiSiamo;
