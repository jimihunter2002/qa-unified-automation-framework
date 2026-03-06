import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Ignore patterns
  {
    ignores: ['**/dist/**', '**/node_modules/**', 'reports/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        __ENV: 'readonly',
      },
    },
  },
  // 2. Recommended JS & TS rules
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Main configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      parserOptions: {
        project: true, // Recommended for type-aware rules
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      semi: ['error', 'always'],
    },
  },

  // 4. Prettier (must be last)
  eslintConfigPrettier,
];
