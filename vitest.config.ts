import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'html'],
      reportsDirectory: './coverage',
      include: [
        'packages/*/src/**/*.{ts,tsx}',
      ],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/index.ts',
        '**/index.tsx',
        '**/tokens/generate.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@vertex-lab/utilities': path.resolve(__dirname, './packages/utilities/src/index.ts'),
      '@vertex-lab/hooks': path.resolve(__dirname, './packages/hooks/src/index.ts'),
      '@vertex-lab/primitives': path.resolve(__dirname, './packages/primitives/src/index.ts'),
      '@vertex-lab/headless': path.resolve(__dirname, './packages/headless/src/index.ts'),
      '@vertex-lab/ui': path.resolve(__dirname, './packages/ui/src/index.ts'),
      '@vertex-lab/theme': path.resolve(__dirname, './packages/theme/src/index.tsx'),
      '@': path.resolve(__dirname, '.'),
    },
  },
});
