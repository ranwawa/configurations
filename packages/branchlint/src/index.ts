#!/usr/bin/env node
import { $, chalk, quiet, nothrow } from 'zx';
import { Config } from './config.js';
import { Linter } from './linter.js';

async function getBranchName() {
  let branchName = '';

  const gitlabCIBranchName = await nothrow(quiet($`echo -n $CI_COMMIT_BRANCH`));
  if (gitlabCIBranchName.exitCode === 0) {
    branchName = gitlabCIBranchName.stdout;
  } else {
    const gitBranchName = await quiet($`git rev-parse --abbrev-ref HEAD`);
    branchName = gitBranchName.stdout;
  }

  return branchName.replace(/\n/, '');
}

async function init() {
  // 1. 获取分支名
  // 2. 读取配置文件
  // 3. 循环配置文件
  // 4. 判断该部分类型
  // 5. 根据类型进行处理

  const conf = new Config();
  conf.initConfig();

  const branchName = await getBranchName();

  const res = Linter.lint(branchName, conf.processedConfig);

  if (res) {
    const { index, passedBranchComponent, unPassedBranchComponent } = res;

    console.log(`
            分支名命令格式不符合要求(https://github.com/ranwawa/test-FE-react)

            ${chalk.green(
              `期望的: ${conf.processedConfig.config[index].message}`
            )}
            ${chalk.red(
              `实际的: ${chalk.grey(
                passedBranchComponent
              )}${unPassedBranchComponent}`
            )}
    `);

    process.exit(1);
  } else {
    console.log(chalk.green('分支名符合规范'));
  }
}
init();

export default {};
