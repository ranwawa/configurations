import path = require('path');
import stylelint = require('stylelint');
import type { TOption, IPluginFactory } from '../types'
import type { Root } from 'postcss';
import { processOption, revertOption } from '../utils/index'

const { report, validateOptions, ruleMessages } = stylelint.utils

const RULE_PROPERTIES = {
	'margin': true,
	'margin-top': true,
	'margin-right': true,
	'margin-bottom': true,
	'margin-left': true,
	'padding': true, 
	'padding-top': true, 
	'padding-right': true, 
	'padding-bottom': true, 
	'padding-left': true, 
	'top': true,
	'right': true,
	'bottom': true,
	'left': true,
}
const VARIABLE_REG = /^s-[a-z]+$/
const DEFAULT_OPTION = {
	"s-xxl": "28px",
	"s-xl": "24px",
	"s-lg": "20px",
	"s-md": "16px",
	"s-sm": "12px",
	"s-xs": "8px",
	"s-xxs": "4px",
};
const ruleName = `ranwawa/spacing-allowed-list`;

const plugin = stylelint.createPlugin(ruleName, (primaryOption, secondaryOptions, context) => {
	return (postcssRoot, postcssResult) => {
		// 验证配置
		const validOptions = validateOptions(
			postcssResult,
			ruleName,
			{
				actual: primaryOption,
				possible: (value) => {
					if (value === true) {
						return true
					}

					if (typeof primaryOption === 'object' && primaryOption !== null && !Array.isArray(primaryOption)) {
						const key = Object.keys(primaryOption).find(key => !VARIABLE_REG.test(key))

						if (key) {
							postcssResult.warn(`配置格式错误,${key}必须符合${VARIABLE_REG}`, { stylelintType: 'invalidOption', });
							return false
						}

						return true
					}

					postcssResult.warn(`配置格式错误,配置只能是对象如:${JSON.stringify(DEFAULT_OPTION)}`, { stylelintType: 'invalidOption', });
					return false
				},
				optional: true
			}
		)

		// 配置项验证失败,直接返回
		if (!validOptions) {
			return
		}

		// 根据文件类型加工配置变量名
		const option = processOption(primaryOption === true ? DEFAULT_OPTION : primaryOption, postcssRoot)
		const revertedOption = revertOption(option);

		console.log('当前插件:', ruleName)
		postcssRoot.walkDecls(decl => {
			const { value, prop } = decl;

			// 不是对应节点 -> 不用检查 -> 返回
			if (!RULE_PROPERTIES[prop]) {
				return
			}

			const values = value.split(' ')
			const invalidValues = values.filter(val => !option[val])

			// 全是预设变量 -> 正确 -> 返回
			if (invalidValues.length === 0) {
				return
			}

			// 有非预设值 -> 没有对应的预设变量 -> 报错
			const inValidValue = invalidValues.find(val => !revertedOption[val])
			if (inValidValue) {
				report({
					ruleName,
					result: postcssResult,
					message: `${inValidValue}不是预设的${prop}值`,
					node: decl,
				})
				return
			}

			const validValues = values.filter(val => revertedOption[val])
			const variables = validValues.map(validValue => revertedOption[validValue])
			// 是预设的值 -> 有预设的变量 -> 开启了修复 -> 直接修复
			if (context.fix) {
				const reg = new RegExp( validValues.map(validValue => `(${validValue})`).join('|'), 'g')
				const replacer = (match) => revertedOption[match]
				decl.value = decl.value.replace(reg, replacer)
				return
			}

			// 是预设的值 -> 有预设的变量 -> 没开修复 -> 报错
			report({
				ruleName,
				result: postcssResult,
				message: `${validValues}->${variables}`,
				node: decl,
			})
		})
	}
})

module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = ruleMessages(ruleName, {});

