module.exports = {
  extends: [require.resolve('./base.js')],
  env: {
    browser: false,
  },
  plugins: [],
  rules: {
    'import/extensions': ['error', 'always'],
  },
};
