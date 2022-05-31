module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [require.resolve('./base.js')],
  rules: {
    '@typescript-eslint/comma-dangle': 'off', // 和prettier冲突了
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint-config-airbnb-typescript/base', // 不包含react相关规则
      ],
      rules: {
        '@typescript-eslint/comma-dangle': 'off', // 和prettier冲突
      },
    },
  ],
};
