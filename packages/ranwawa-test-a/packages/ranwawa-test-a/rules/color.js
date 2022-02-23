"use strict";
exports.__esModule = true;
var stylelint = require("stylelint");
var index_1 = require("../utils/index");
var ruleMessages = stylelint.utils.ruleMessages;
var RULE_PROPERTY = 'color';
var VARIABLE_REG = /^c-[a-z]+$/;
var DEFAULT_OPTION = {
    "c-primary": "#f05b28",
    "c-secondary": "#fe8513",
    "c-dark": "#000",
    "c-base": "#333",
    "c-gray": "#666",
    "c-light": "#999",
    "c-muted": "#eee"
};
var ruleName = "ranwawa/".concat(RULE_PROPERTY, "-allowed-list");
module.exports = (0, index_1.createAllowedListPluginFactory)({
    ruleName: ruleName,
    variableReg: VARIABLE_REG,
    defaultOption: DEFAULT_OPTION,
    ruleProperty: RULE_PROPERTY
});
module.exports.ruleName = ruleName;
module.exports.messages = ruleMessages(ruleName, {});
