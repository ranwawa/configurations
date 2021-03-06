const path = require('path');
const { TESTS_FILES } = require('../utils/index');

module.exports = {
  extends: [
    require.resolve('./base-ts.js'),
    'plugin:eslint-plugin-jsx-a11y/recommended',
    'plugin:eslint-plugin-vuejs-accessibility/recommended',
  ],
  plugins: [
    'eslint-plugin-vue',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-vuejs-accessibility  ',
  ], // 依赖vue-eslint-parser
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  overrides: [
    {
      files: TESTS_FILES,
      extends: ['plugin:eslint-plugin-testing-library/vue'],
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, './src')]],
        extensions: ['.ts', '.tsx', '.vue'],
      },
      node: { extensions: ['.mjs', '.js', '.json', '.tsx', '.ts', '.vue'] },
    },
  },
};
