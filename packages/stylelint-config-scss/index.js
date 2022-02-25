module.export = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
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
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
};
