module.exports = {
  extends: [require.resolve('./vue3x.js'), require.resolve('./base-ts.js')],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
};
