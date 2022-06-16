module.exports = {
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [require.resolve('./base.js')],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'eslint-config-airbnb-typescript/base', // 不包含react相关规则
      ],
      rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/comma-dangle': 'off', // 和prettier冲突
      },
    },
  ],
};
