import React from 'react';
import './Servizi.css'; // Importa il CSS personalizzato

const Servizi = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🚀 Il Nostro Modo di Lavorare</h1>
      <p className="text-center mb-4">
        Abbiamo a disposizione le migliori attrezzature e un personale efficiente e preparato per risolvere nel più breve tempo possibile ogni problema e per darvi l'assistenza più completa. 
        L'elenco qui sotto è solo uno schema semplificato di tutti i nostri servizi. Se avete qualche domanda particolare, siamo sempre a vostra disposizione per qualsiasi informazione ai nostri numeri di telefono oppure via e-mail.
      </p>

      <div className="row">
        {/* Box per Preparazioni Sportive */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🏎️ Preparazioni Sportive</h3>
            <img src="/preparazioni.jpeg" alt="Preparazioni Sportive" className="service-image" />
            <ul className="list-unstyled">
              <li>Centraline B.</li>
              <li>Centraline D.</li>
              <li>Filtri Aria (K&N, H&M, Sparco).</li>
              <li>Scarichi Sportivi (Laser, Sebring, Tuner).</li>
              <li>Impianti frenanti (Mintex, Ferodo R., Braking).</li>
              <li>Distanziali (Runner).</li>
              <li>Alberi a camme.</li>
              <li>Assetti Sportivi.</li>
              <li>Molle (H&R, G&M, Eibacj, Fedem).</li>
              <li>Ammortizzatori (Koni, G&M, Bilsteim).</li>
            </ul>
          </div>
        </div>

        {/* Box per Tagliandi Auto Benzina e Diesel */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🔧 Tagliandi Auto Benzina e Diesel</h3>
            <img src="/tagliando.jpeg" alt="Tagliandi Auto Benzina e Diesel" className="service-image" />
            <ul className="list-unstyled">
              <li>Controllo e sostituzione pattini e dischi.</li>
              <li>Sostituzione filtri.</li>
              <li>Olio Motore (Fuchs, Agip, Elf).</li>
              <li>Collaudo veicolo in strada.</li>
              <li>Controllo e sostituzioni generali.</li>
            </ul>
          </div>
        </div>

        {/* Box per Impianti Stereo */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🔊 Impianti Stereo</h3>
            <img src="/stereo.jpeg" alt="Impianti Stereo" className="service-image" />
            <ul className="list-unstyled">
              <li>Accessori.</li>
              <li>Comandi volante.</li>
              <li>Caricatori CD.</li>
              <li>Kit viva-voce.</li>
              <li>Altoparlanti.</li>
              <li>Sub Woofer.</li>
              <li>Equalizzatori processori.</li>
              <li>Amplificatori.</li>
              <li>Autoradio: Sinto CD, Sinto Cassette.</li>
            </ul>
          </div>
        </div>

        {/* Box per Assistenza A/C + Climatizzatori */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🌬️ Assistenza A/C + Climatizzatori</h3>
            <img src="/climatizzatore.jpeg" alt="Assistenza A/C + Climatizzatori" className="service-image" />
            <ul className="list-unstyled">
              <li>Manutenzione.</li>
              <li>Sostituzione filtri.</li>
              <li>Ricarica.</li>
            </ul>
          </div>
        </div>

        {/* Box per Assistenza e Sostituzione Pneumatici */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🚗 Assistenza e Sostituzione Pneumatici</h3>
            <img src="/pneumatici.jpeg" alt="Assistenza e Sostituzione Pneumatici" className="service-image" />
            <ul className="list-unstyled">
              <li>Riparazione tubes.</li>
              <li>Secur-Pneus (miscela inerte per gonfiaggio pneumatici).</li>
              <li>Convergenza ed Equilibratura.</li>
              <li>Pneumatici (Michelin, Pirelli, Dunlop, Yokohama, Bridgestone).</li>
            </ul>
          </div>
        </div>

        {/* Box per Centro Revisioni */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🔧 Centro Revisioni</h3>
            <img src="/revisione.jpeg" alt="Centro Revisioni" className="service-image" />
            <p>Centro revisione Auto e Moto MCTC conc. n. 428 del 11/12/2006. Autorizzata dalla Motorizzazione Civile, l’officina è dotata delle più moderne attrezzature, che permetteranno di effettuare un check-up completo della vostra auto o della vostra moto.</p>
          </div>
        </div>

        {/* Box per Convenzioni con le Maggiori Società di Leasing */}
        <div className="col-md-12 mb-4">
          <div className="service-box p-4 text-center">
            <h3>🤝 Convenzioni con le Maggiori Società di Leasing</h3>
            <img src="/leasing.webp" alt="Convenzioni con le Maggiori Società di Leasing" className="service-image" />
            <p>
              ARVAL, LEASEPLAN ITALIA, EUROPE CAR, CAR SERVER, LEASY RENT, LOCAT RENT<br />
              MERCEDES BENZ CHARTERIVAY, MERCEDES BENZ RENTAL, PROGRAMMA DI AUTONOLEGGIO FIORENTINO, SAVARENT, VOLKSWAGEN LEASING, DRIVE SERVICE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servizi;
