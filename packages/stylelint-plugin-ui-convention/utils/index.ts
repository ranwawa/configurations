import path = require('path');
import stylelint = require('stylelint');
import type { TOption, IPluginFactory } from '../types';
import type { Root } from 'postcss';

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

export const createAllowedListPluginFactory = ({
  ruleName,
  variableReg,
  defaultOption,
  ruleProperty,
}: IPluginFactory) => {
  console.log(98, ruleName);
  return stylelint.createPlugin(
    ruleName,
    (primaryOption, secondaryOptions, context) => {
      return (postcssRoot, postcssResult) => {
        // 验证配置
        const validOptions = validateOptions(postcssResult, ruleName, {
          actual: primaryOption,
          possible: (value) => {
            if (value === true) {
              return true;
            }

            if (
              typeof primaryOption === 'object' &&
              primaryOption !== null &&
              !Array.isArray(primaryOption)
            ) {
              const key = Object.keys(primaryOption).find(
                (key) => !variableReg.test(key)
              );

              if (key) {
                postcssResult.warn(
                  `配置格式错误,${key}必须符合${variableReg}`,
                  { stylelintType: 'invalidOption' }
                );
                return false;
              }

              return true;
            }

            postcssResult.warn(
              `配置格式错误,配置只能是对象如:${JSON.stringify(defaultOption)}`,
              { stylelintType: 'invalidOption' }
            );
            return false;
          },
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
          // 不是font-size节点 -> 不用检查 -> 返回
          if (decl.prop !== ruleProperty) {
            return;
          }

          const { value } = decl;

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
              message: `${value}不是预设的${ruleProperty}值`,
              node: decl,
            });
            return;
          }

          // 是预设的值 -> 有预设的变量 -> 开启了修复 -> 直接修复
          if (context.fix) {
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
      };
    }
  );
};
