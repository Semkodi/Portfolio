import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Hauptkonfiguration für das Vite-Buildtool.
 */
export default defineConfig({
    base: './',
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3000,
        open: true,
    },
});
