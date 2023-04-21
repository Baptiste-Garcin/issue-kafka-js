import { defineConfig } from 'vitest/config';

process.env.NODE_ENV = 'test';
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text-summary', 'html'],
    },
    globals: true,
    include: ['src/*.test.ts'],
  },
});
