import React from 'react';
import ReactDOM from 'react-dom/client';
import Anwendung from './Anwendung';
import './index.css';

/** Lokale Schriften (via @fontsource, DSGVO-konform, keine externen CDNs). */
import '@fontsource/chivo/300.css';
import '@fontsource/chivo/400.css';
import '@fontsource/chivo/500.css';
import '@fontsource/chivo/700.css';
import '@fontsource/chivo-mono/300.css';
import '@fontsource/chivo-mono/400.css';
import '@fontsource/chivo-mono/500.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Anwendung />
  </React.StrictMode>,
);
