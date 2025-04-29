import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'views/App';
import { registerSW } from 'virtual:pwa-register';
import posthog from 'posthog-js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker
registerSW({ immediate: true });

// PostHog without cookies
posthog.init('phc_XinSFyU7OeaGN1Npjw8rzkVqV7u21jPyt5V30rnEDc6', {
  api_host: 'https://eu.i.posthog.com',
  persistence: 'memory'
});
