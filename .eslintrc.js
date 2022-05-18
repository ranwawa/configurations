module.exports = {
  extends: ['@ranwawa/eslint-config-react'],
  rules: {
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/stylelint-plugin-ui-convention/**/*.ts'],
      },
    ],
  },
};
