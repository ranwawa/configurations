// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@ranwawa/git-cz-config');

module.exports = {
  ...config,
  scopes: [
    'root',
    'branchlint',
    'treelint',
    'commitlint-plugin',
    'eslint-plugin',
    'git-cz-config',
    'prettier-config',
    'stylelint-config-scss',
    'stylelint-plugin-ui-convention',
  ],
};
