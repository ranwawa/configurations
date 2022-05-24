module.exports = {
  extends: ['plugin:@ranwawa/eslint-plugin/vue-ts'],
  rules: {
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/stylelint-plugin-ui-convention/**/*.ts'],
      },
    ],
  },
};
