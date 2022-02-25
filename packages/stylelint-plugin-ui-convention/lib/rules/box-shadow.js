'use strict';
exports.__esModule = true;
var stylelint = require('stylelint');
var index_1 = require('../utils/index');
var ruleMessages = stylelint.utils.ruleMessages;
var RULE_PROPERTY = 'box-shadow';
var VARIABLE_REG = /^bxsh-[a-z]+$/;
var DEFAULT_OPTION = {
  'bxsh-base': '0 0 10 rgba(0, 0, 0, .1)',
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
