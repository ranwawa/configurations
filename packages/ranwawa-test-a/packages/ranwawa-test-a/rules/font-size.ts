import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index'

const { ruleMessages } = stylelint.utils

const RULE_PROPERTY = 'font-size'
const VARIABLE_REG = /^fz-[a-z]+$/
const DEFAULT_OPTION = {
	"fz-xs": "10px",
	"fz-sm": "12px",
	"fz-md": "14px",
	"fz-lg": "16px",
	"fz-xl": "18px",
	"fz-xxl": "20px"
};
const ruleName = `ranwawa/${RULE_PROPERTY}-allowed-list`;


module.exports = createAllowedListPluginFactory({
	ruleName,
	variableReg: VARIABLE_REG,
	defaultOption: DEFAULT_OPTION,
	ruleProperty: RULE_PROPERTY
});
module.exports.ruleName = ruleName;
module.exports.messages = ruleMessages(ruleName, {});

