module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-floating-promises': ['error'],
    'no-void': 'off',
  },
  ignorePatterns: ['.eslintrc.js'],
};
