export default class Config {
  defaultConfig = [
    {
      type: 'content',
      pattern: ['feat', 'fix'],
      message: '分支名只能以feat和fix开头',
    },
    {
      type: 'separator',
      pattern: '/',
      message: '分隔符只能是/',
    },
    {
      type: 'content',
      pattern: /[a-zA-Z0-9]+/,
      message: '名称只能是英文',
    },
    {
      type: 'separator',
      pattern: '/',
      message: '分隔符只能是/',
    },
    {
      type: 'content',
      pattern: /[a-zA-Z0-9_]+/,
      message: '内容只能是英文加下划线',
    },
  ];
}
