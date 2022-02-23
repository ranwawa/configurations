"use strict";
exports.__esModule = true;
var stylelint = require("stylelint");
var index_1 = require("../utils/index");
var ruleMessages = stylelint.utils.ruleMessages;
var RULE_PROPERTY = 'z-index';
var VARIABLE_REG = /^z-[a-z]+$/;
var DEFAULT_OPTION = {
    "z-dropdown": "500",
    "z-sticky": "520",
    "z-fixed": "530",
    "z-modal": "550",
    "z-popover": "560",
    "z-tooltip": "570",
    "z-modal-backdrop": "1040"
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
