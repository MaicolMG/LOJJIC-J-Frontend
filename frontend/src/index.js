import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Inyección dinámica de tipografía corporativa para SIGID
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Outfit:wght@300;400;600;800&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

/**
 * PUNTO DE ENTRADA PRINCIPAL - SIGID FRONTEND
 * Inicializa el Virtual DOM de React y aplica el StrictMode para depuración.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
