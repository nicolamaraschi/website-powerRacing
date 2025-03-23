import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Dashboard from './components/layout/Dashboard';

// Pagine
import Login from './pages/Login';
import CarsList from './pages/cars/CarsList';
import CarForm from './pages/cars/CarForm';
import CarDetails from './pages/cars/CarDetails';
import NotFound from './pages/NotFound';

// Contesto per l'autenticazione
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

import './App.css';

// Componente ErrorBoundary per catturare gli errori
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          backgroundColor: '#ffdddd', 
          borderRadius: '5px' 
        }}>
          <h2>Qualcosa è andato storto.</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Riprova
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Rotte protette con layout dashboard */}
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route index element={<CarsList />} />
                <Route path="cars" element={<CarsList />} />
                <Route path="cars/new" element={<CarForm />} />
                <Route path="cars/edit/:id" element={<CarForm />} />
                <Route path="cars/:id" element={<CarDetails />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;