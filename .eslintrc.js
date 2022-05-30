module.exports = {
  extends: ['plugin:@ranwawa/eslint-plugin/base-ts'],
  rules: {
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/stylelint-plugin-ui-convention/**/*.ts'],
      },
    ],
  },
};
