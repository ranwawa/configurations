#!/usr/bin/env node
import { $, chalk, quiet, nothrow } from 'zx';
import { Config } from './config.js';
import { Linter } from './linter.js';

async function getBranchName() {
  let branchName = '';

  const gitlabCIBranchName = await nothrow(quiet($`echo $CI_COMMIT_BRANCH`));
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
  conf.processConfig();

  const branchName = await getBranchName();

  const res = Linter.lint(branchName, conf.processedConfig);

  if (res) {
    const { config, index, passedBranchComponent, unPassedBranchComponent } =
      res;

    console.log(`
            分支名命令格式不符合要求(https://github.com/ranwawa/test-FE-react)

            ${await chalk.green(`期望的: ${config[index].message}`)}
            ${await chalk.red(
              `实际的: ${await chalk.grey(
                passedBranchComponent
              )}${unPassedBranchComponent}`
            )}
    `);

    process.exit(1);
  } else {
    await $`exit 0`;
  }
}
init();

export default {};
