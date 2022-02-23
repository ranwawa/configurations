"use strict";
exports.__esModule = true;
var stylelint = require("stylelint");
var index_1 = require("../utils/index");
var _a = stylelint.utils, report = _a.report, validateOptions = _a.validateOptions, ruleMessages = _a.ruleMessages;
var RULE_PROPERTIES = {
    'margin': true,
    'margin-top': true,
    'margin-right': true,
    'margin-bottom': true,
    'margin-left': true,
    'padding': true,
    'padding-top': true,
    'padding-right': true,
    'padding-bottom': true,
    'padding-left': true,
    'top': true,
    'right': true,
    'bottom': true,
    'left': true
};
var VARIABLE_REG = /^s-[a-z]+$/;
var DEFAULT_OPTION = {
    "s-xxl": "28px",
    "s-xl": "24px",
    "s-lg": "20px",
    "s-md": "16px",
    "s-sm": "12px",
    "s-xs": "8px",
    "s-xxs": "4px"
};
var ruleName = "ranwawa/spacing-allowed-list";
var plugin = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions, context) {
    return function (postcssRoot, postcssResult) {
        // 验证配置
        var validOptions = validateOptions(postcssResult, ruleName, {
            actual: primaryOption,
            possible: function (value) {
                if (value === true) {
                    return true;
                }
                if (typeof primaryOption === 'object' && primaryOption !== null && !Array.isArray(primaryOption)) {
                    var key = Object.keys(primaryOption).find(function (key) { return !VARIABLE_REG.test(key); });
                    if (key) {
                        postcssResult.warn("\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF,".concat(key, "\u5FC5\u987B\u7B26\u5408").concat(VARIABLE_REG), { stylelintType: 'invalidOption' });
                        return false;
                    }
                    return true;
                }
                postcssResult.warn("\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF,\u914D\u7F6E\u53EA\u80FD\u662F\u5BF9\u8C61\u5982:".concat(JSON.stringify(DEFAULT_OPTION)), { stylelintType: 'invalidOption' });
                return false;
            },
            optional: true
        });
        // 配置项验证失败,直接返回
        if (!validOptions) {
            return;
        }
        // 根据文件类型加工配置变量名
        var option = (0, index_1.processOption)(primaryOption === true ? DEFAULT_OPTION : primaryOption, postcssRoot);
        var revertedOption = (0, index_1.revertOption)(option);
        console.log('当前插件:', ruleName);
        postcssRoot.walkDecls(function (decl) {
            var value = decl.value, prop = decl.prop;
            // 不是对应节点 -> 不用检查 -> 返回
            if (!RULE_PROPERTIES[prop]) {
                return;
            }
            var values = value.split(' ');
            var invalidValues = values.filter(function (val) { return !option[val]; });
            // 全是预设变量 -> 正确 -> 返回
            if (invalidValues.length === 0) {
                return;
            }
            // 有非预设值 -> 没有对应的预设变量 -> 报错
            var inValidValue = invalidValues.find(function (val) { return !revertedOption[val]; });
            if (inValidValue) {
                report({
                    ruleName: ruleName,
                    result: postcssResult,
                    message: "".concat(inValidValue, "\u4E0D\u662F\u9884\u8BBE\u7684").concat(prop, "\u503C"),
                    node: decl
                });
                return;
            }
            var validValues = values.filter(function (val) { return revertedOption[val]; });
            var variables = validValues.map(function (validValue) { return revertedOption[validValue]; });
            // 是预设的值 -> 有预设的变量 -> 开启了修复 -> 直接修复
            if (context.fix) {
                var reg = new RegExp(validValues.map(function (validValue) { return "(".concat(validValue, ")"); }).join('|'), 'g');
                var replacer = function (match) { return revertedOption[match]; };
                decl.value = decl.value.replace(reg, replacer);
                return;
            }
            // 是预设的值 -> 有预设的变量 -> 没开修复 -> 报错
            report({
                ruleName: ruleName,
                result: postcssResult,
                message: "".concat(validValues, "->").concat(variables),
                node: decl
            });
        });
    };
});
module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = ruleMessages(ruleName, {});
