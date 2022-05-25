const { TESTS_FILES } = require('../utils');

module.exports = {
  extends: [require.resolve('./base')],
  plugins: ['eslint-plugin-vue'], // 依赖vue-eslint-parser
  overrides: [
    {
      files: TESTS_FILES,
      extends: ['plugin:eslint-plugin-testing-library/vue'],
    },
  ],
};
