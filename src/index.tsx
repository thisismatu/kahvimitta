import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from 'views/App';
import { webVitals } from './vitals';
import { registerSW } from 'virtual:pwa-register';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);

// Register service worker
registerSW({ immediate: true });

// Vercel Speed Insight
webVitals();
