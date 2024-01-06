module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: ['import', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
}
