/* eslint-env node */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        // project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        // '@typescript-eslint/strict-boolean-expressions': false,
        semi: ['error', 'always'],
        'react/display-name': 'off',
        curly: 'error',
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        // '@typescript-eslint/semi': [2, 'always'],
        // '@typescript-eslint/strict-boolean-expressions': 0,
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    },
};