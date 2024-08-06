import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/



// change this for docker setup!!!
export default defineConfig({
    base: "/site-dashboard/",
    plugins: [react()],
    preview: {
        port: 8080,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000/', // Backend Proxy
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://localhost:8080",
        proxy: {
            '/api': {
                target: 'http://localhost:8000/', // Backend Proxy
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
