module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  plugins: ['@ranwawa/stylelint-plugin-ui-convention'],
  rules: {
    'selector-class-pattern': '^[a-z][a-z-_0-9]*[a-z0-9]$',
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z-_0-9]*[a-z0-9]$',
    'order/properties-alphabetical-order': null,
    'ranwawa/border-allowed-list': true,
    'ranwawa/border-color-allowed-list': true,
    'ranwawa/border-radius-allowed-list': true,
    'ranwawa/box-shadow-allowed-list': true,
    'ranwawa/color-allowed-list': true,
    'ranwawa/font-size-allowed-list': true,
    'ranwawa/spacing-allowed-list': true,
    'ranwawa/z-index-allowed-list': true,
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
};
