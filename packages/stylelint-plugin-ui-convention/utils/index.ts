import path = require('path');
import stylelint = require('stylelint');
import type { Root } from 'postcss';
import type { TOption, IPluginFactory } from '../types';

const { report, validateOptions } = stylelint.utils;

export const processOption = (
  primaryOption: TOption | true,
  postcssRoot: Root
): TOption => {
  let processKey = (primaryKey) => primaryKey;
  const extension = path.extname(postcssRoot.source.input.file);

  switch (extension) {
    case '.css':
      processKey = (primaryKey) => `var(--${primaryKey})`;
      break;
    case '.scss':
    case '.sass':
    case '.stylus':
      processKey = (primaryKey) => `$${primaryKey}`;
      break;
    case '.less':
      processKey = (primaryKey) => `@${primaryKey}`;
      break;
    default:
      break;
  }

  const processedOption = {};

  Object.entries(primaryOption).forEach(([key, value]) => {
    processedOption[processKey(key)] = value;
  });

  return processedOption;
};

export const revertOption = (primaryOption: TOption): TOption => {
  const option = {};

  Object.entries(primaryOption).forEach(([key, value]) => {
    option[value] = key;
  });

  return option;
};

export const isObject = (primaryOption: any): boolean =>
  typeof primaryOption === 'object' &&
  primaryOption !== null &&
  !Array.isArray(primaryOption);

export const possibleOptions =
  (primaryOption, variableReg, postcssResult, defaultOption) => (value) => {
    if (value === true) {
      return true;
    }

    if (!isObject(primaryOption)) {
      postcssResult.warn(
        `配置格式错误,配置只能是对象如:${JSON.stringify(defaultOption)}`,
        { stylelintType: 'invalidOption' }
      );

      return false;
    }

    const item = Object.keys(primaryOption).find(
      (key) => !variableReg.test(key)
    );

    if (item) {
      postcssResult.warn(`配置格式错误,${item}必须符合${variableReg}`, {
        stylelintType: 'invalidOption',
      });

      return false;
    }

    return true;
  };

export const createAllowedListPluginFactory = ({
  ruleName,
  variableReg,
  defaultOption,
  ruleProperty,
}: IPluginFactory) =>
  stylelint.createPlugin(
    ruleName,
    (primaryOption, _secondaryOptions, context) =>
      (postcssRoot, postcssResult) => {
        // 验证配置
        const validOptions = validateOptions(postcssResult, ruleName, {
          actual: primaryOption,
          possible: possibleOptions(
            primaryOption,
            variableReg,
            postcssResult,
            defaultOption
          ),
          optional: true,
        });

        // 配置项验证失败,直接返回
        if (!validOptions) {
          return;
        }

        // 根据文件类型加工配置变量名
        const option = processOption(
          primaryOption === true ? defaultOption : primaryOption,
          postcssRoot
        );
        const revertedOption = revertOption(option);

        console.log('当前插件:', ruleName);
        postcssRoot.walkDecls((decl) => {
          const { value, prop } = decl;

          // 不是font-size节点 -> 不用检查 -> 返回
          if (prop !== ruleProperty) {
            return;
          }

          // 是预设变量 -> 正确 -> 返回
          if (option[value]) {
            return;
          }

          // 不是预设值 -> 没有对应的预设变量 -> 报错
          const presetVariable = revertedOption[value];

          if (!presetVariable) {
            report({
              ruleName,
              result: postcssResult,
              message: `${value}不是预设的${prop}值`,
              node: decl,
            });

            return;
          }

          // 是预设的值 -> 有预设的变量 -> 开启了修复 -> 直接修复
          if (context.fix) {
            // eslint-disable-next-line no-param-reassign
            decl.value = decl.value.replace(value, presetVariable);

            return;
          }

          // 是预设的值 -> 有预设的变量 -> 没开修复 -> 报错
          report({
            ruleName,
            result: postcssResult,
            message: `${value}->${presetVariable}`,
            node: decl,
          });
        });
      }
  );
