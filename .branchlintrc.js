module.exports = {
  config: [
    {
      pattern: ['feat', 'fix'],
      message: '分支名只能以feat和fix开头',
    },
    {
      pattern: '/',
      message: '分隔符只能是/',
    },
    {
      pattern: /[a-zA-Z]+/,
      message: '名称只能是英文',
    },
    {
      pattern: '/',
      message: '分隔符只能是-',
    },
    {
      pattern: /[a-z-]+/,
      message: '内容只能是英文加中划线',
    },
  ],
  examples: ['feat/ranwawa/allowed-list', 'fix/ranwawa/allowed-list'],
};
