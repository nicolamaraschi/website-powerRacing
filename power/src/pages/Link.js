import React from 'react';
import './Link.css'; // Importa il CSS personalizzato

const links = [
  {
    url: 'https://www.edidomus.it',
    title: 'Edidomus',
    description: "Il portale dell'editore di Quattroruote, Volare, Tuttoturismo, ecc... Per chi ama muoversi.",
    image: '/edidomus.jpg', // Percorso corretto per l'immagine
  },
  {
    url: 'https://www.lastminutetour.it',
    title: 'Last Minute Tour',
    description: "Il più famoso portale per i viaggi dell'ultimo minuto ai prezzi più convenienti.",
    image: '/viaggio.jpeg',
  },
  {
    url: 'https://www.ciaomilano.com',
    title: 'Ciao Milano',
    description: 'Locali, mappe, iniziative. Tutte le informazioni utili per vivere al meglio Milano.',
    image: '/_42bb8efc-d03f-42ce-9bfc-13d0766e3e66.jpeg',
  },
  {
    url: 'https://www.mangiarefuori.it',
    title: 'Mangiare Fuori',
    description: 'Regione per regione, tutti i ristoranti sul vostro percorso di viaggio.',
    image: '/cibo.jpg',
  },
  {
    url: 'https://www.meteoitalia.it',
    title: 'Meteo Italia',
    description: 'Per sapere sempre le condizioni meteo che incontrerete viaggiando.',
    image: '/meteo.jpeg',
  },
  {
    url: 'https://www.comune.milano.it',
    title: 'Comune Milano',
    description: 'Il sito ufficiale del Comune di Milano per essere sempre aggiornati.',
    image: '/milano.png',
  },
  {
    url: 'https://www.tiscali.it',
    title: 'Tiscali',
    description: 'Un modo rapido per consultare un database tra i più aggiornati disponibili sul web.',
    image: '/_fb75380c-b642-4434-9db7-868935a604be.jpeg',
  },
  {
    url: 'https://www.benessere.com',
    title: 'Benessere',
    description: 'Tutte le informazioni possibili sul benessere psicofisico. Per essere sempre in forma.',
    image: '/_a90ce777-6514-4216-9bab-3f42446071ac.jpeg',
  },
];

const LinkPage = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Link Utili</h1>
      <div className="row">
        {links.map((link, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card">
              <img 
                src={link.image} 
                className="card-img-top" 
                alt={link.title} 
              />
              <div className="card-body">
                <h5 className="card-title">{link.title}</h5>
                <p className="card-text">{link.description}</p>
                <a href={link.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Visita il sito
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkPage;
