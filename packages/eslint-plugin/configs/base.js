const { TESTS_FILES } = require('../utils/index');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint-config-airbnb-base', // 不包含react
    'plugin:eslint-plugin-sonarjs/recommended',
    'plugin:eslint-plugin-prettier/recommended',
  ],
  plugins: [
    'eslint-plugin-sonarjs',
    'eslint-plugin-jest',
    'eslint-plugin-jest-dom',
    'eslint-plugin-testing-library',
    'eslint-plugin-prettier',
  ],
  rules: {
    'no-warning-comments': ['warn', { terms: ['TODO'], location: 'start' }],
    complexity: ['warn', { max: 10 }],
    'max-lines-per-function': [
      'warn',
      { max: 100, skipBlankLines: true, skipComments: true },
    ],
    'max-lines': [
      'warn',
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    'max-depth': ['warn', 5],
    'max-params': ['error', 5],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'sonarjs/cognitive-complexity': ['off'], // 关掉,用eslint默认的圈复杂度
  },
  overrides: [
    {
      files: TESTS_FILES,
      env: {
        jest: true,
      },
      extends: [
        'plugin:eslint-plugin-jest/recommended',
        'plugin:eslint-plugin-jest-dom/recommended',
      ],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
};
