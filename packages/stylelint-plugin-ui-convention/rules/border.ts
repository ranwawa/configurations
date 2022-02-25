import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index';

const { ruleMessages } = stylelint.utils;

const RULE_PROPERTY = 'border';
const VARIABLE_REG = /^bd-[a-z]+$/;
const DEFAULT_OPTION = {
  'bd-base': '1px solid #eee',
  'bd-comp': '1px solid $ccc',
  'bd-test': '1px solid #ff000c',
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
