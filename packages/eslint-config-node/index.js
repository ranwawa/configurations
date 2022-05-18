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
    'import/extensions': ['error', 'always'],
    'no-warning-comments': ['warn', { terms: ['TODO'], location: 'start' }],
  },
  overrides: [
    {
      files: ['test/**', '*.test.js', '*.test.ts'],
      plugins: ['eslint-plugin-jest'],
      extends: ['plugin:eslint-plugin-jest/recommended'],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
};
