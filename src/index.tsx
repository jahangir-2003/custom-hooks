import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx'
import { ProdcutProvider } from './Context/ProductContext.tsx';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProdcutProvider>
      <App />
    </ProdcutProvider>
  </React.StrictMode>
);

