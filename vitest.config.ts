import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        env: {
            TMDB_TOKEN: 'Bearer test-token',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'next/image': path.resolve(__dirname, './src/__mocks__/next-image.tsx'),
            'next/link': path.resolve(__dirname, './src/__mocks__/next-link.tsx'),
        },
    },
});
