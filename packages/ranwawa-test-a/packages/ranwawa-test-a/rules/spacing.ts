import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index'

const { ruleMessages } = stylelint.utils

const RULE_PROPERTY = 'border-color'
const VARIABLE_REG = /^bdc-[a-z]+$/
const DEFAULT_OPTION = {
	"bdc-base": "#eee",
	"bdc-comp": "#ccc",
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

