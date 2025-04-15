// power/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Servizi from './pages/Servizi';
import VetrinaUsato from './pages/VetrinaUsato';
// Commenta o rimuovi la riga problematica
// import CarDetail from './pages/CarDetail';
import Link from './pages/Link';
import Contatti from './pages/Contatti';
import RichiestaPreventivo from './pages/RichiestaPreventivo';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/vetrina" element={<VetrinaUsato />} />
          {/* Commenta o rimuovi questa rotta fino a quando non hai il componente */}
          {/* <Route path="/vetrina/:id" element={<CarDetail />} /> */}
          <Route path="/link" element={<Link />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/richiedi-preventivo" element={<RichiestaPreventivo />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;