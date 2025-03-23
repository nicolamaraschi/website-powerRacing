import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato email non valido')
      .required('Email richiesta'),
    password: Yup.string()
      .required('Password richiesta')
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    try {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        toast.success('Login effettuato con successo!');
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Errore durante il login. Riprova.');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img 
            src="/logo.png" 
            alt="Power Racing Logo" 
            className="login-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=Power+Racing';
            }}
          />
          <h1>Admin Dashboard</h1>
          <p>Accedi per gestire il parco auto usate</p>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Inserisci la tua email"
                />
                <ErrorMessage name="email" component="div" className="error-feedback" />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Inserisci la tua password"
                />
                <ErrorMessage name="password" component="div" className="error-feedback" />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <span className="loading-spinner small"></span>
                ) : (
                  'Accedi'
                )}
              </button>
            </Form>
          )}
        </Formik>
        
        <div className="login-footer">
          <p className="login-help">
            Per assistenza, contatta l'amministratore di sistema.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;