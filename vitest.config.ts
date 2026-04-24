import { defineConfig } from 'vitest/config';
import angular from '@analogjs/platform/testing/vitest';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    css: true, 
  },
});