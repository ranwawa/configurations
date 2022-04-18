import _ from 'lodash';

export default class Linter {
  config = [];

  branchName = '';

  regStr = '';

  constructor(branchName, config) {
    this.branchName = branchName;
    this.config = config;
  }

  lint() {
    const newConfig = this.config.map((item) => {
      const { pattern } = item;
      const newItem = { ...item };

      if (_.isArray(pattern)) {
        newItem.regStr = `(${pattern.join('|')})`;
        newItem.validateFunc = this.arry;
      } else if (_.isString(pattern)) {
        newItem.regStr = `(${pattern})`;
        newItem.validateFunc = this.primitive;
      } else if (_.isRegExp(pattern)) {
        const str = pattern.toString();
        newItem.regStr = `(${str.substring(1, str.length - 1)})`;
        newItem.validateFunc = this.reg;
      }

      return newItem;
    });
    this.regStr = newConfig.map((ele) => ele.regStr).join('');
    const reg = new RegExp(this.regStr);
    return this.branchName.match(reg);
  }
}
