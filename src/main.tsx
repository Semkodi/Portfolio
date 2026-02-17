import React from 'react';
import ReactDOM from 'react-dom/client';
import Anwendung from './Anwendung';
import './index.css';

/**
 * LOKALE SCHRIFTARTEN (Hostet über @fontsource gemäß DSGVO)
 * Verhindert externe CDNs und verbessert Ladezeiten sowie Datenschutz.
 */
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/fira-code/400.css';
import '@fontsource/fira-code/700.css';

/**
 * Initialisierung der React-Anwendung im DOM-Wurzelelement.
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Anwendung />
    </React.StrictMode>,
);
