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
(function () {
  const l = window.location;
  if (l.search[1] === '/') {
    const decoded = l.search.slice(1).split('&').map(s => s.replace(/~and~/g, '&')).join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
