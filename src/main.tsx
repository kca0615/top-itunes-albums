// src/main.tsx
// Main entry point for the React application.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
// Import global CSS styles

// Render the App component into the root element in index.html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
