import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Version identifier - auto-updates with build timestamp
const BUILD_VERSION = `1.0.0-${new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')}`;
console.log(
  `%c StartCode v${BUILD_VERSION} %c`,
  'background: #6366f1; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
  ''
);
console.log('🚀 StartCode initialized');

// Handle SPA redirect from 404.html (GitHub Pages)
// The 404.html stores the intended route in sessionStorage
(function () {
  const redirect = sessionStorage.getItem('spa_redirect');
  if (redirect) {
    sessionStorage.removeItem('spa_redirect');
    // Use replaceState to update URL without reload
    // This allows React Router to pick up the correct route
    const base = '/StartCode';
    const newUrl = base + redirect;
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, null, newUrl);
    }
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
