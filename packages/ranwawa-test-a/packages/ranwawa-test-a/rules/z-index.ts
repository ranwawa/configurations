import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index'

const { ruleMessages } = stylelint.utils

const RULE_PROPERTY = 'z-index'
const VARIABLE_REG = /^z-[a-z]+$/
const DEFAULT_OPTION = {
	"z-dropdown": "500",
	"z-sticky": "520",
	"z-fixed": "530",
	"z-modal": "550",
	"z-popover": "560",
	"z-tooltip": "570",
	"z-modal-backdrop": "1040",
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

