#!/usr/bin/env node
const chalk = require('chalk4');
const { cosmiconfigSync } = require('cosmiconfig');
const path = require('path');
const meow = require('meow9');
const { lint } = require('./linter.js');
const { flags, helperText, TREE_LINT } = require('./cli-config.js');

const { log } = console;

const cli = meow(helperText, {
  importMeta: true,
  flags,
});

const getConfigFile = (project) => {
  let configFile = null;
  const explorer = cosmiconfigSync(TREE_LINT);

  if (project) {
    const projectPath = path.resolve(project);

    try {
      configFile = explorer.load(projectPath);
    } catch (err) {
      log(chalk.red(err.message));
    }
  } else {
    configFile = explorer.search();
  }

  return configFile;
};

const res = getConfigFile(cli.flags.project);

if (!res) {
  log(chalk.red('\n没有找到配置文件\n'));
  process.exit(1);
} else {
  const { filepath, config } = res;

  // TODO 最好是通过git获取当前已经保存过的文件结构
  const dirname = path.dirname(filepath);
  const lintRes = lint(dirname, config, dirname);

  if (lintRes) {
    const { currentDirectory, expectedStr, receivedStr } = lintRes;

    log(
      `\n${currentDirectory}目录下文件命名异常\n\n${chalk.green(
        expectedStr
      )}\n${chalk.red(receivedStr)}\n`
    );
    process.exit(1);
  } else {
    log(chalk.green('treelint验证通过: 目录结构符合规范'));
  }
}

export {};
