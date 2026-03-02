import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Leaflet globals
        L: 'readonly',
        // jQuery
        $: 'readonly',
        // Application globals
        marker: 'writable',
        map: 'writable',
        dist: 'writable',
        perkeydist: 'writable',
        detalisElement: 'readonly',
        // Third-party libraries
        osmtogeojson: 'readonly',
        turf: 'readonly',
        leafletPip: 'readonly',
        notifySreenReader: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'no-undef': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
    ],
  },
];
