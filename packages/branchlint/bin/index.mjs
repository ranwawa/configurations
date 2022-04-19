#!/usr/bin/env zx
/* eslint-disable import/extensions */
import { $, chalk, quiet } from 'zx';
import _ from 'lodash';

class Linter {
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

class Config {
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

async function init() {
  // 1. 获取分支名
  // 2. 读取配置文件
  // 3. 循环配置文件
  // 4. 判断该部分类型
  // 5. 根据类型进行处理

  const config = new Config().defaultConfig;
  const branchName = await quiet($`git rev-parse --abbrev-ref HEAD`);
  const linter = new Linter(branchName.stdout, config);
  if (!linter.lint()) {
    console.log(
      chalk.red(`
      ${branchName}不符合规范.
      要求是这样的:${linter.regStr}
    `)
    );
  }
}
init();

export default {};
