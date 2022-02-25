import stylelint = require('stylelint');
import { createAllowedListPluginFactory } from '../utils/index';

const { ruleMessages } = stylelint.utils;

const RULE_PROPERTY = 'color';
const VARIABLE_REG = /^c-[a-z]+$/;
const DEFAULT_OPTION = {
  'c-primary': '#f05b28',
  'c-secondary': '#fe8513',
  'c-dark': '#000',
  'c-base': '#333',
  'c-gray': '#666',
  'c-light': '#999',
  'c-muted': '#eee',
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
