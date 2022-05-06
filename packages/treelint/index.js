import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';
import path from 'path';
import { lint } from './src/linter.js';

const explorer = cosmiconfig('treelint');

explorer
  .search()
  .then((res) => {
    if (!res) {
      console.log(chalk.red('没有找到配置文件'));
      return;
    }
    const { filepath, config } = res;

    const dirname = path.dirname(filepath);
    const lintRes = lint(dirname, config, dirname);

    if (lintRes) {
      const { relative, expectedStr, receivedStr } = res;

      console.log(
        `\n${relative}目录下文件命名异常\n\n${expectedStr}\n${receivedStr}\n`
      );
    }
  })
  .catch((err) => console.log(err));
