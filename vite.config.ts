import { defineConfig } from 'vite'; // Vite Konfigurationstool importieren // Erklärung
import react from '@vitejs/plugin-react'; // React-Plugin für Vite importieren // Erklärung

// https://vitejs.dev/config/ // Erklärung
/**
 * Hauptkonfiguration für das Vite-Buildtool. // Erklärung
 */
export default defineConfig({ // Konfiguration definieren // Erklärung
    plugins: [react()], // React-Unterstützung aktivieren // Erklärung
    server: { // Server-Einstellungen // Erklärung
        port: 3000, // Den Standard-Port auf 3000 setzen // Erklärung
        open: true, // Den Browser beim Start automatisch öffnen // Erklärung
    }, // Erklärung
}); // Erklärung
