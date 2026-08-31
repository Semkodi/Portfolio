import React from 'react';
import ReactDOM from 'react-dom/client';
import Anwendung from './Anwendung';
import './index.css';

/** Lokale Schriften (via @fontsource, DSGVO-konform, keine externen CDNs). */
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import '@fontsource/fraunces/900.css';
import '@fontsource/fraunces/400-italic.css';
import '@fontsource/fraunces/600-italic.css';
import '@fontsource/fira-code/400.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Anwendung />
  </React.StrictMode>,
);
