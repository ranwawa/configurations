#!/usr/bin/env zx
/* eslint-disable import/extensions */
import { $, chalk, quiet } from 'zx';
import Linter from './src/linter.js';
import Config from './src/config.js';

// type MessageFunc = () => string;
// interface ConfigItem {
//   type: string;
//   pattern: string | string[] | RegExp;
//   message: string | MessageFunc;
// }

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
