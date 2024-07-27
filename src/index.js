import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe diretamente 'react-dom'
import reportWebVitals from './reportWebVitals';
import TemplatePokedex from './templatePokedex'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TemplatePokedex />
  </React.StrictMode>
);


reportWebVitals();
