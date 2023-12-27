module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended',
    'airbnb', 'airbnb-typescript'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
