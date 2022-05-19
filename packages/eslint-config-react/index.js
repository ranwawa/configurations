module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
    'plugin:sonarjs/recommended',
    'eslint-config-prettier',
  ],
  plugins: [
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-sonarjs',
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': ['error', 'always'],
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
    'sonarjs/cognitive-complexity': ['off'], // 关掉,用eslint默认的
  },
  overrides: [
    {
      files: ['test/**', '*.test.js', '*.test.ts'],
      plugins: ['eslint-plugin-jest'],
      extends: ['plugin:eslint-plugin-jest/recommended'],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
};
