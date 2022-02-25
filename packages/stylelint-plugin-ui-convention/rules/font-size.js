'use strict';
exports.__esModule = true;
var stylelint = require('stylelint');
var index_1 = require('../utils/index');
var ruleMessages = stylelint.utils.ruleMessages;
var RULE_PROPERTY = 'font-size';
var VARIABLE_REG = /^fz-[a-z]+$/;
var DEFAULT_OPTION = {
  'fz-xs': '10px',
  'fz-sm': '12px',
  'fz-md': '14px',
  'fz-lg': '16px',
  'fz-xl': '18px',
  'fz-xxl': '20px',
};
var ruleName = 'ranwawa/'.concat(RULE_PROPERTY, '-allowed-list');
module.exports = (0, index_1.createAllowedListPluginFactory)({
  ruleName: ruleName,
  variableReg: VARIABLE_REG,
  defaultOption: DEFAULT_OPTION,
  ruleProperty: RULE_PROPERTY,
});
module.exports.ruleName = ruleName;
module.exports.messages = ruleMessages(ruleName, {});
