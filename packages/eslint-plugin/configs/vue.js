module.exports = {
  extends: [
    'plugin:eslint-plugin-vue/vue3-recommended',
    'plugin:eslint-plugin-vue/recommended', // Vue.js 2.x.
    require.resolve('./base'),
  ],
  plugins: ['eslint-plugin-vue'],
};
