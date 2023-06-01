module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        // '@typescript-eslint/strict-boolean-expressions': false,
        // semi: ['error', 'always'],
        'react/display-name': 'off',
        curly: 'error',
        semi: 'off',
        '@typescript-eslint/semi': [2, 'always'],
        '@typescript-eslint/strict-boolean-expressions': 0,
    },
};
