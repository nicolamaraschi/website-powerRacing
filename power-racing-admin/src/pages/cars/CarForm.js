import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import carService from '../../services/carService';
import './CarForm.css';

// Icone
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formError, setFormError] = useState(null);
  const isEditMode = !!id;

  // Carica i dettagli dell'auto se in modalità modifica
  useEffect(() => {
    if (isEditMode) {
      const fetchCar = async () => {
        try {
          const response = await carService.getCarById(id);
          setCar(response.data);
          setImagePreview(response.data.image);
        } catch (error) {
          toast.error('Errore nel caricamento delle informazioni dell\'auto');
          console.error(error);
          navigate('/cars');
        } finally {
          setLoading(false);
        }
      };

      fetchCar();
    }
  }, [id, isEditMode, navigate]);

  // Schema di validazione con Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Titolo richiesto'),
    description: Yup.string().required('Descrizione richiesta'),
    mileage: Yup.number()
      .required('Chilometraggio richiesto')
      .min(0, 'Il chilometraggio non può essere negativo'),
    year: Yup.number()
      .required('Anno richiesto')
      .min(1900, 'Anno non valido')
      .max(new Date().getFullYear() + 1, 'Anno non valido'),
    price: Yup.number()
      .required('Prezzo richiesto')
      .min(0, 'Il prezzo non può essere negativo'),
    fuelType: Yup.string().required('Tipo di carburante richiesto'),
    engineSize: Yup.number()
      .required('Cilindrata richiesta')
      .min(0, 'La cilindrata non può essere negativa'),
    power: Yup.number()
      .required('Potenza richiesta')
      .min(0, 'La potenza non può essere negativa'),
    transmission: Yup.string().required('Tipo di trasmissione richiesto'),
    drivetrain: Yup.string().required('Tipo di trazione richiesto'),
    doors: Yup.number()
      .required('Numero di porte richiesto')
      .min(1, 'Il numero di porte deve essere almeno 1'),
    seats: Yup.number()
      .required('Numero di posti richiesto')
      .min(1, 'Il numero di posti deve essere almeno 1'),
    color: Yup.string().required('Colore richiesto'),
    condition: Yup.string().required('Condizione richiesta'),
    owners: Yup.number()
      .required('Numero di proprietari richiesto')
      .min(0, 'Il numero di proprietari non può essere negativo'),
    registrationDate: Yup.date().required('Data di immatricolazione richiesta'),
    location: Yup.string().required('Posizione richiesta'),
    'contactInfo.phone': Yup.string().required('Numero di telefono richiesto'),
    'contactInfo.email': Yup.string()
      .email('Email non valida')
      .required('Email richiesta'),
  });

  // Valori iniziali del form
  const initialValues = {
    title: '',
    description: '',
    mileage: '',
    year: new Date().getFullYear(),
    price: '',
    fuelType: '',
    engineSize: '',
    power: '',
    transmission: 'Manuale',
    drivetrain: 'Anteriore',
    doors: 5,
    seats: 5,
    color: '',
    condition: 'Usato',
    owners: 1,
    registrationDate: new Date().toISOString().split('T')[0],
    image: '',
    location: 'Milano',
    inspectionValidUntil: '',
    insuranceValidUntil: '',
    options: ['Clima', 'Radio'],
    contactInfo: {
      phone: '+39 02 48302847',
      email: 'info@powerracing.it',
    },
  };

  // Gestione upload immagine
  const handleImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Formato immagine non supportato. Utilizzare JPEG, PNG o WebP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'immagine non può superare i 5MB');
      return;
    }

    try {
      // In un'applicazione reale, qui viene caricata l'immagine al backend
      const response = await carService.uploadImage(file);
      setImagePreview(response.data.imageUrl);
      setFieldValue('image', response.data.imageUrl);
    } catch (error) {
      toast.error('Errore durante il caricamento dell\'immagine');
      console.error(error);
    }
  };

  // Gestione invio form
  const handleSubmit = async (values, { setSubmitting }) => {
    setFormError(null);

    try {
      if (isEditMode) {
        await carService.updateCar(id, values);
        toast.success('Auto aggiornata con successo');
      } else {
        await carService.createCar(values);
        toast.success('Auto aggiunta con successo');
      }
      navigate('/cars');
    } catch (error) {
      setFormError('Errore durante il salvataggio. Riprova.');
      toast.error('Errore durante il salvataggio');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="car-form-page">
      <div className="page-header">
        <h1>{isEditMode ? 'Modifica Auto' : 'Aggiungi Auto'}</h1>
        <button onClick={() => navigate('/cars')} className="btn btn-secondary">
          <ArrowBackIcon /> Torna alla lista
        </button>
      </div>

      <div className="card">
        <Formik
          initialValues={car || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="car-form">
              {formError && <div className="alert alert-danger">{formError}</div>}

              <div className="form-sections">
                <div className="form-section">
                  <h2 className="section-title">Informazioni Principali</h2>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Marca e Modello</label>
                      <Field name="title" id="title" className="form-control" />
                      <ErrorMessage name="title" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="description">Descrizione</label>
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        className="form-control"
                        rows="4"
                      />
                      <ErrorMessage name="description" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">Prezzo (€)</label>
                      <Field
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                      />
                      <ErrorMessage name="price" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row cols-3">
                    <div className="form-group">
                      <label htmlFor="condition">Condizione</label>
                      <Field as="select" name="condition" id="condition" className="form-control">
                        <option value="Nuovo">Nuovo</option>
                        <option value="Usato">Usato</option>
                        <option value="Km0">Km0</option>
                        <option value="Aziendale">Aziendale</option>
                      </Field>
                      <ErrorMessage name="condition" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="year">Anno</label>
                      <Field
                        type="number"
                        name="year"
                        id="year"
                        className="form-control"
                      />
                      <ErrorMessage name="year" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="mileage">Chilometraggio</label>
                      <Field
                        type="number"
                        name="mileage"
                        id="mileage"
                        className="form-control"
                      />
                      <ErrorMessage name="mileage" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group image-upload-group">
                      <label>Immagine</label>
                      <div className="image-upload-container">
                        {imagePreview ? (
                          <div className="image-preview">
                            <img src={imagePreview} alt="Anteprima" />
                          </div>
                        ) : (
                          <div className="image-placeholder">
                            <ImageIcon />
                            <span>Nessuna immagine</span>
                          </div>
                        )}
                        <div className="image-upload-controls">
                          <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setFieldValue)}
                            className="image-upload-input"
                          />
                          <label htmlFor="image-upload" className="btn btn-secondary">
                            Seleziona immagine
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="section-title">Specifiche Tecniche</h2>

                  <div className="form-row cols-3">
                    <div className="form-group">
                      <label htmlFor="fuelType">Carburante</label>
                      <Field as="select" name="fuelType" id="fuelType" className="form-control">
                        <option value="">Seleziona...</option>
                        <option value="Benzina">Benzina</option>
                        <option value="Diesel">Diesel</option>
                        <option value="GPL">GPL</option>
                        <option value="Metano">Metano</option>
                        <option value="Elettrico">Elettrico</option>
                        <option value="Ibrido">Ibrido</option>
                      </Field>
                      <ErrorMessage name="fuelType" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="engineSize">Cilindrata (cc)</label>
                      <Field
                        type="number"
                        name="engineSize"
                        id="engineSize"
                        className="form-control"
                      />
                      <ErrorMessage name="engineSize" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="power">Potenza (CV)</label>
                      <Field
                        type="number"
                        name="power"
                        id="power"
                        className="form-control"
                      />
                      <ErrorMessage name="power" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row cols-3">
                    <div className="form-group">
                      <label htmlFor="transmission">Trasmissione</label>
                      <Field as="select" name="transmission" id="transmission" className="form-control">
                        <option value="Manuale">Manuale</option>
                        <option value="Automatico">Automatico</option>
                        <option value="Semiautomatico">Semiautomatico</option>
                      </Field>
                      <ErrorMessage name="transmission" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="drivetrain">Trazione</label>
                      <Field as="select" name="drivetrain" id="drivetrain" className="form-control">
                        <option value="Anteriore">Anteriore</option>
                        <option value="Posteriore">Posteriore</option>
                        <option value="Integrale">Integrale</option>
                      </Field>
                      <ErrorMessage name="drivetrain" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="color">Colore</label>
                      <Field name="color" id="color" className="form-control" />
                      <ErrorMessage name="color" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label htmlFor="doors">Porte</label>
                      <Field
                        type="number"
                        name="doors"
                        id="doors"
                        className="form-control"
                      />
                      <ErrorMessage name="doors" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="seats">Posti</label>
                      <Field
                        type="number"
                        name="seats"
                        id="seats"
                        className="form-control"
                      />
                      <ErrorMessage name="seats" component="div" className="error-feedback" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="section-title">Dettagli Aggiuntivi</h2>

                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label htmlFor="owners">Numero Proprietari</label>
                      <Field
                        type="number"
                        name="owners"
                        id="owners"
                        className="form-control"
                      />
                      <ErrorMessage name="owners" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Località</label>
                      <Field name="location" id="location" className="form-control" />
                      <ErrorMessage name="location" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row cols-3">
                    <div className="form-group">
                      <label htmlFor="registrationDate">Data di Immatricolazione</label>
                      <Field
                        type="date"
                        name="registrationDate"
                        id="registrationDate"
                        className="form-control"
                      />
                      <ErrorMessage name="registrationDate" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inspectionValidUntil">Revisione Valida Fino</label>
                      <Field
                        type="date"
                        name="inspectionValidUntil"
                        id="inspectionValidUntil"
                        className="form-control"
                      />
                      <ErrorMessage name="inspectionValidUntil" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="insuranceValidUntil">Assicurazione Valida Fino</label>
                      <Field
                        type="date"
                        name="insuranceValidUntil"
                        id="insuranceValidUntil"
                        className="form-control"
                      />
                      <ErrorMessage name="insuranceValidUntil" component="div" className="error-feedback" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Optional</label>
                      <FieldArray name="options">
                        {({ remove, push }) => (
                          <div>
                            {values.options.length > 0 &&
                              values.options.map((option, index) => (
                                <div className="option-item" key={index}>
                                  <Field
                                    name={`options.${index}`}
                                    className="form-control"
                                    placeholder="Aggiungi un optional..."
                                  />
                                  <button
                                    type="button"
                                    className="btn-icon"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </div>
                              ))}
                            <button
                              type="button"
                              className="btn btn-secondary btn-add-option"
                              onClick={() => push('')}
                            >
                              <AddIcon /> Aggiungi Optional
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="section-title">Informazioni di Contatto</h2>

                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label htmlFor="contactInfo.phone">Telefono</label>
                      <Field name="contactInfo.phone" id="contactInfo.phone" className="form-control" />
                      <ErrorMessage name="contactInfo.phone" component="div" className="error-feedback" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contactInfo.email">Email</label>
                      <Field
                        type="email"
                        name="contactInfo.email"
                        id="contactInfo.email"
                        className="form-control"
                      />
                      <ErrorMessage name="contactInfo.email" component="div" className="error-feedback" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/cars')}
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="loading-spinner small"></span>
                  ) : (
                    <>
                      <SaveIcon /> {isEditMode ? 'Aggiorna Auto' : 'Salva Auto'}
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CarForm;