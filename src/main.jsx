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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
