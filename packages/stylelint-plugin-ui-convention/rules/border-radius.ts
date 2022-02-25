import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index';

const { ruleMessages } = stylelint.utils;

const RULE_PROPERTY = 'border-radius';
const VARIABLE_REG = /^bdrs-[a-z]+$/;
const DEFAULT_OPTION = {
  'bdrs-round': '50%',
  'bdrs-xl': '16',
  'bdrs-lg': '12',
  'bdrs-md': '8',
  'bdrs-sm': '4',
  'bdrs-none': '0',
};
const ruleName = `ranwawa/${RULE_PROPERTY}-allowed-list`;

module.exports = createAllowedListPluginFactory({
  ruleName,
  variableReg: VARIABLE_REG,
  defaultOption: DEFAULT_OPTION,
  ruleProperty: RULE_PROPERTY,
});
module.exports.ruleName = ruleName;
module.exports.messages = ruleMessages(ruleName, {});
