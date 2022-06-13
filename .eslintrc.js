module.exports = {
  extends: ['plugin:@ranwawa/eslint-plugin/base-ts'],
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/stylelint-plugin-ui-convention/**/*.ts'],
      },
    ],
  },
};
