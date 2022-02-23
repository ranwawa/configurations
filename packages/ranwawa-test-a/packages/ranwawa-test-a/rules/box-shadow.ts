import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index'

const { ruleMessages } = stylelint.utils

const RULE_PROPERTY = 'box-shadow'
const VARIABLE_REG = /^bxsh-[a-z]+$/
const DEFAULT_OPTION = {
	"bxsh-base": "0 0 10 rgba(0, 0, 0, .1)",
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

