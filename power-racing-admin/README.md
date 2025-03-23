# Power Racing Admin Panel

Pannello di amministrazione per la gestione della vetrina di auto usate Power Racing.

## Funzionalità

- **Autenticazione**: Sistema di login sicuro per amministratori
- **Dashboard**: Panoramica rapida delle statistiche e delle attività recenti
- **Gestione Auto**: Visualizzazione, aggiunta, modifica ed eliminazione delle auto usate
- **Interfaccia Reattiva**: Design responsive ottimizzato per desktop e dispositivi mobili
- **Gestione Immagini**: Caricamento e anteprima di immagini per ogni auto
- **Filtri e Ricerca**: Strumenti avanzati per trovare rapidamente le auto nel database

## Tecnologie Utilizzate

- **Frontend**: React, React Router, Formik & Yup per la validazione, Material UI Icons
- **State Management**: Context API di React
- **Styling**: CSS modulare con responsive design
- **Notifiche**: React Toastify per feedback all'utente
- **API**: Axios per le chiamate HTTP

## Requisiti di Sistema

- Node.js 16.x o superiore
- npm 8.x o superiore

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/powerracing/power-racing-admin.git
   cd power-racing-admin
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura le variabili d'ambiente:
   Crea un file `.env` nella root del progetto:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Avvia l'applicazione in modalità sviluppo:
   ```bash
   npm start
   ```
   L'applicazione sarà disponibile all'indirizzo [http://localhost:3000](http://localhost:3000).

## Configurazione per la Produzione

1. Crea la build di produzione:
   ```bash
   npm run build
   ```

2. Distribuisci i file nella cartella `build` sul tuo server web.

## Accesso

- **URL**: http://localhost:3000 (in sviluppo)
- **Credenziali di default**: 
  - Email: admin@powerracing.it
  - Password: admin123

## Struttura del Progetto

```
power-racing-admin/
├── public/                 # File statici
├── src/                    # Codice sorgente
│   ├── components/         # Componenti riutilizzabili
│   │   ├── auth/           # Componenti per l'autenticazione
│   │   └── layout/         # Layout e componenti strutturali
│   ├── context/            # Context per lo state management
│   ├── pages/              # Pagine dell'applicazione
│   │   ├── cars/           # Pagine relative alla gestione auto
│   │   └── ...             # Altre pagine
│   ├── services/           # Servizi per le API
│   ├── styles/             # Stili globali
│   ├── App.js              # Componente principale
│   └── index.js            # Entry point
└── package.json            # Dipendenze e script
```

## Personalizzazione

- I colori principali dell'interfaccia possono essere modificati nei file CSS
- Il logo può essere sostituito nel file `src/components/layout/Sidebar.js`
- I dettagli di contatto predefiniti possono essere modificati in `src/pages/cars/CarForm.js`

## Integrazione con Backend

Questo frontend è progettato per lavorare con un'API RESTful. L'interfaccia delle API è implementata nel file `src/services/carService.js`.

Per l'integrazione con il backend reale:
1. Rimuovi i dati di esempio nel file `carService.js`
2. Decomenta e adatta le chiamate API reali per la tua implementazione

## Limitazioni dell'Anteprima

Nella versione attuale:
- L'autenticazione è simulata (nessuna chiamata API reale)
- I dati delle auto sono simulati localmente
- Le immagini vengono gestite con URL temporanei invece di un vero caricamento sul server

## Supporto

Per assistenza o segnalazioni di bug, contattare:
- Email: support@powerracing.it
- Telefono: +39.02.48302847

## Licenza

Tutti i diritti riservati © 2024 Power Racing Srl