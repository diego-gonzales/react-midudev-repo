module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react/jsx-runtime', // <--- Esto es para que no de error al usar JSX sin importar React
    'prettier', // <--- colocar siempre al final
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', // <---
    '@typescript-eslint/triple-slash-reference': 'off', // <---
  },
}
