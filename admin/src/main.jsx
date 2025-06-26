import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { StoreContextProvider } from '../context/StoreContext'; // ✅ adjust path if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContextProvider>     {/* ✅ Wrap App with context */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContextProvider>
);
