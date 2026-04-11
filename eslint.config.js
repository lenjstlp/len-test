import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'coverage', 'node_modules'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/block-order': [
        'error',
        {
          order: ['template', ['script', 'script setup'], 'style'],
        },
      ],
    },
  },
  {
    files: ['*.config.{js,cjs,mjs,ts}', 'vite.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
);
