module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
    'eslint-config-prettier',
  ],
  plugins: [
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
