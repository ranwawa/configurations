'use strict';
exports.__esModule = true;
var stylelint = require('stylelint');
var index_1 = require('../utils/index');
var ruleMessages = stylelint.utils.ruleMessages;
var RULE_PROPERTY = 'border-radius';
var VARIABLE_REG = /^bdrs-[a-z]+$/;
var DEFAULT_OPTION = {
  'bdrs-round': '50%',
  'bdrs-xl': '16',
  'bdrs-lg': '12',
  'bdrs-md': '8',
  'bdrs-sm': '4',
  'bdrs-none': '0',
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
