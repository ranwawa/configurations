import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const ENUM = {
  FILE: 'FILE',
  DIRECTORY: 'DIRECTORY',
  REGEXP: 'REGEXP',
  FUNCTION: 'FUNCTION',
};

/**
 * 获取当前目录的目录结构以及通配符
 * @param {object} config
 * @returns
 */
export function getExpectedAndCommonPattern(config = {}) {
  const expected = [];
  let commonPattern = null;

  Object.entries(config).forEach(([key, value]) => {
    if (_.isString(value) && value.toUpperCase() === ENUM.REGEXP) {
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
export function lint(dir, config, rootDir) {
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

    if (_.isObject(configFile)) {
      lint(path.resolve(dir, file), configFile, rootDir);
    }
  }

  return null;
}