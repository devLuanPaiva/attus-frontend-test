import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/test-setup.ts'],
        include: ['src/**/*.spec.ts'],
        coverage: {
            reporter: ['text', 'lcov'],
            include: ['src/app/**/*.ts'],
            exclude: ['src/app/**/*.spec.ts', 'src/main.ts', 'src/app/app.config.ts'],
        },
    },
});