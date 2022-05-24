module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    require.resolve('./base.js'),
    'eslint-config-airbnb-typescript/base', // 不包含react相关规则
  ],
};
