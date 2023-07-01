import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import rules from './eslint.rules.js';

/** @type { import("@types/eslint").Linter.FlatConfig[] } */
export default [
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { modules: true },
                ecmaVersion: 'latest',
                project: './tsconfig.json',
            },
        },
        files: ['src/**/*.ts', 'src/**/*.js'],
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs['eslint-recommended'].rules,
            ...tsPlugin.configs['recommended'].rules,
            ...rules,
        }
    }
];