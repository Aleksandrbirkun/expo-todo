import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'apps/api/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: 'libs/codegen/src/lib/generated',
  },
  plugins: [
    '@hey-api/client-axios', // Axios client
    '@tanstack/react-query', // React Query helpers
  ],
});
