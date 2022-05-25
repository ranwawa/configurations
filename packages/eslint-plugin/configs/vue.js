const { TESTS_FILES } = require('../utils');

module.exports = {
  extends: [
    'plugin:eslint-plugin-vue/vue3-recommended',
    'plugin:eslint-plugin-vue/recommended', // Vue.js 2.x.
    require.resolve('./base'),
  ],
  plugins: ['eslint-plugin-vue'], // 依赖vue-eslint-parser
  overrides: {
    files: TESTS_FILES,
    extends: ['plugin:eslint-plugin-testing-library/vue'],
  },
};
