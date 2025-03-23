import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; // Importazione corretta del nuovo componente HomePage
import Servizi from './pages/Servizi';
import VetrinaUsato from './pages/VetrinaUsato';
// Rimuoviamo il componente CarDetail se non esiste ancora
import Link from './pages/Link';
import Contatti from './pages/Contatti';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Usa il nuovo componente HomePage */}
          {/* La route Chi Siamo è stata rimossa, dato che ora è unificata con Home */}
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/vetrina" element={<VetrinaUsato />} />
          {/* Rimuoviamo temporaneamente la route a CarDetail */}
          <Route path="/link" element={<Link />} />
          <Route path="/contatti" element={<Contatti />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;