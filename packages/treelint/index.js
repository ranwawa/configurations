#!/usr/bin/env node
import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';
import path from 'path';
import { lint } from './src/linter.js';

const explorer = cosmiconfig('treelint');

explorer
  .search()
  .then((res) => {
    if (!res) {
      console.log(chalk.red('\n没有找到配置文件\n'));
      process.exit(1);
      return;
    }
    const { filepath, config } = res;

    // TODO 最好是通过git获取当前已经保存过的文件结构
    const dirname = path.dirname(filepath);
    const lintRes = lint(dirname, config, dirname);

    if (lintRes) {
      const { currentDirectory, expectedStr, receivedStr } = lintRes;

      console.log(
        `\n${currentDirectory}目录下文件命名异常\n\n${chalk.green(
          expectedStr
        )}\n${chalk.red(receivedStr)}\n`
      );
      process.exit(1);
    }
  })
  .catch((err) => console.log(err));
