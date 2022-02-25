'use strict';
exports.__esModule = true;
var stylelint = require('stylelint');
var index_1 = require('../utils/index');
var ruleMessages = stylelint.utils.ruleMessages;
var RULE_PROPERTY = 'border';
var VARIABLE_REG = /^bd-[a-z]+$/;
var DEFAULT_OPTION = {
  'bd-base': '1px solid #eee',
  'bd-comp': '1px solid $ccc',
  'bd-test': '1px solid #ff000c',
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
