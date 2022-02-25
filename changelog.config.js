const config = require('@ranwawa/git-cz-config');

module.exports = {
  ...config,
  scopes: [
    'root',
    '@ranwawa/commitlint-plugin',
    '@ranwawa/eslint-config-react',
    '@ranwawa/prettier-config',
    '@ranwawa/stylelint-config-scss',
    '@ranwawa/stylelint-plugin-ui-convention',
  ],
};
