import _ from 'lodash';

export class Config {
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
      pattern: /[a-zA-Z]+/,
      message: '名称只能是英文',
    },
    {
      type: 'separator',
      pattern: '/',
      message: '分隔符只能是/',
    },
    {
      type: 'content',
      pattern: /[a-z-]+/,
      message: '内容只能是英文加中划线',
    },
  ];
  originalConfig = null;
  processedConfig = [];

  processConfig() {
    const config = this.originalConfig || this.defaultConfig;

    this.processedConfig = config.map((item) => {
      const { pattern } = item;
      const newItem = { ...item };

      if (_.isArray(pattern)) {
        newItem.regStr = `(${pattern.join('|')})`;
      } else if (_.isString(pattern)) {
        newItem.regStr = `(${pattern})`;
      } else if (_.isRegExp(pattern)) {
        const str = pattern.toString();
        newItem.regStr = `(${str.substring(1, str.length - 1)})`;
      }

      newItem.reg = new RegExp(newItem.regStr);
      return newItem;
    });
  }
}

export default Config;
