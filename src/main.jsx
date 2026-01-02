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
(function () {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();

// Handle query-based redirect from 404.html
// Converts /?/path to /path for client-side routing
(function () {
  const l = window.location;
  // Check if we have a /?/ pattern (from 404.html redirect)
  if (l.search.startsWith('?/')) {
    // Extract the path from query string: /?/login -> /login
    const pathFromQuery = l.search.slice(2).split('&')[0].replace(/~and~/g, '&');
    // Get hash if any
    const hash = l.hash || '';
    // Build the new URL with proper path
    const newPath = l.pathname.replace(/\/$/, '') + '/' + pathFromQuery + hash;
    window.history.replaceState(null, null, newPath);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
