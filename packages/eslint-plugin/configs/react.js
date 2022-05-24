module.exports = {
  extends: [
    'eslint-config-airbnb', // 会继承eslint-config-airbnb-base
    require.resolve('./base'),
  ],
  plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  rules: {},
};
