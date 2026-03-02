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
        // Global libraries loaded via script tags
        L: 'readonly',
        $: 'readonly',
        jQuery: 'readonly',
        turf: 'readonly',
        leafletPip: 'readonly',
        osmtogeojson: 'readonly',
        _: 'readonly', // Lodash
        define: 'readonly', // AMD module loader
        // Global variables used across modules
        marker: 'writable',
        map: 'writable',
        dist: 'writable',
        detalisElement: 'writable',
        notifySreenReader: 'writable',
        perkeydist: 'writable',
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
      // Ignore third-party library files
      'src/components/Search/osmtogeojson.js',
      'src/components/DistanceFinder/Polyline.encoded.js',
    ],
  },
];
