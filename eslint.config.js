import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // JavaScript 和 TypeScript 文件
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },

  // Astro 文件
  ...eslintPluginAstro.configs.recommended,

  // 忽略文件
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '**/*.d.ts',
    ],
  },
];