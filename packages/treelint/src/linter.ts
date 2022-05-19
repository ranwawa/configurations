const fs = require('fs');
const path = require('path');
const lodash = require('lodash');

const ENUM = {
  FILE: 'FILE',
  DIRECTORY: 'DIRECTORY',
  // TODO 由于对象属性值无法使用\,所以对正则功能有影响,最好换成gitignore中那种模式
  REGEXP: 'REGEXP',
  FUNCTION: 'FUNCTION',
};

interface IConfig {
  [key: string]: keyof typeof ENUM;
}

/**
 * 获取当前目录的目录结构以及通配符
 * @param {object} config
 * @returns
 */
function getExpectedAndCommonPattern(config: IConfig = {}) {
  const expected = [];
  let commonPattern = null;

  Object.entries(config).forEach(([key, value]) => {
    if (lodash.isString(value) && value.toUpperCase() === ENUM.REGEXP) {
      commonPattern = new RegExp(key);
    } else {
      expected.push(key);
    }
  });

  return {
    expected,
    commonPattern,
  };
}

/**
 * 对比配置的目录结构和实际目录结构是否一致
 * @param {string} dir 当前遍历的目录
 * @param {object} config 当前目录的配置结构
 * @param {string} rootDir 根目录
 * @returns
 */
function lint(dir, config, rootDir) {
  const files = fs.readdirSync(dir);
  const { length } = files;

  for (let i = 0; i < length; i += 1) {
    const file = files[i];

    const configFile = config[file];
    const unConfig = configFile === undefined;

    if (unConfig) {
      const { expected, commonPattern } = getExpectedAndCommonPattern(config);
      const unPassReg = commonPattern === null || !commonPattern.test(file);

      if (unPassReg) {
        const currentDirectory = dir.replace(rootDir, '') || '根';
        const expectedStr = `期望的: ${expected}`;
        const receivedStr = `实际的: ${file}`;

        return {
          currentDirectory,
          expectedStr,
          receivedStr,
        };
      }
    }

    if (lodash.isObject(configFile)) {
      lint(path.resolve(dir, file), configFile, rootDir);
    }
  }

  return null;
}

module.exports = {
  getExpectedAndCommonPattern,
  lint,
};

export {};
