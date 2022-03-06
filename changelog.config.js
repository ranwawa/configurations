const config = require('@ranwawa/git-cz-config');

module.exports = {
  ...config,
  scopes: [
    'root',
    'commitlint-plugin',
    'eslint-config-react',
    'git-cz-config',
    'prettier-config',
    'stylelint-config-scss',
    'stylelint-plugin-ui-convention',
  ],
};
