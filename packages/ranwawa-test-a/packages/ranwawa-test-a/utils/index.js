"use strict";
exports.__esModule = true;
exports.createAllowedListPluginFactory = exports.revertOption = exports.processOption = void 0;
var path = require("path");
var stylelint = require("stylelint");
var _a = stylelint.utils, report = _a.report, validateOptions = _a.validateOptions;
var processOption = function (primaryOption, postcssRoot) {
    var processKey = function (primaryKey) { return primaryKey; };
    var extension = path.extname(postcssRoot.source.input.file);
    switch (extension) {
        case '.css':
            processKey = function (primaryKey) { return "var(--".concat(primaryKey, ")"); };
            break;
        case '.scss':
        case '.sass':
        case '.stylus':
            processKey = function (primaryKey) { return "$".concat(primaryKey); };
            break;
        case '.less':
            processKey = function (primaryKey) { return "@".concat(primaryKey); };
            break;
        default:
            break;
    }
    var processedOption = {};
    Object.entries(primaryOption).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        processedOption[processKey(key)] = value;
    });
    return processedOption;
};
exports.processOption = processOption;
var revertOption = function (primaryOption) {
    var option = {};
    Object.entries(primaryOption).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        option[value] = key;
    });
    return option;
};
exports.revertOption = revertOption;
var createAllowedListPluginFactory = function (_a) {
    var ruleName = _a.ruleName, variableReg = _a.variableReg, defaultOption = _a.defaultOption, ruleProperty = _a.ruleProperty;
    console.log(98, ruleName);
    return stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions, context) {
        return function (postcssRoot, postcssResult) {
            // 验证配置
            var validOptions = validateOptions(postcssResult, ruleName, {
                actual: primaryOption,
                possible: function (value) {
                    if (value === true) {
                        return true;
                    }
                    if (typeof primaryOption === 'object' && primaryOption !== null && !Array.isArray(primaryOption)) {
                        var key = Object.keys(primaryOption).find(function (key) { return !variableReg.test(key); });
                        if (key) {
                            postcssResult.warn("\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF,".concat(key, "\u5FC5\u987B\u7B26\u5408").concat(variableReg), { stylelintType: 'invalidOption' });
                            return false;
                        }
                        return true;
                    }
                    postcssResult.warn("\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF,\u914D\u7F6E\u53EA\u80FD\u662F\u5BF9\u8C61\u5982:".concat(JSON.stringify(defaultOption)), { stylelintType: 'invalidOption' });
                    return false;
                },
                optional: true
            });
            // 配置项验证失败,直接返回
            if (!validOptions) {
                return;
            }
            // 根据文件类型加工配置变量名
            var option = (0, exports.processOption)(primaryOption === true ? defaultOption : primaryOption, postcssRoot);
            var revertedOption = (0, exports.revertOption)(option);
            console.log('当前插件:', ruleName);
            postcssRoot.walkDecls(function (decl) {
                // 不是font-size节点 -> 不用检查 -> 返回
                if (decl.prop !== ruleProperty) {
                    return;
                }
                var value = decl.value;
                // 是预设变量 -> 正确 -> 返回
                if (option[value]) {
                    return;
                }
                // 不是预设值 -> 没有对应的预设变量 -> 报错
                var presetVariable = revertedOption[value];
                if (!presetVariable) {
                    report({
                        ruleName: ruleName,
                        result: postcssResult,
                        message: "".concat(value, "\u4E0D\u662F\u9884\u8BBE\u7684").concat(ruleProperty, "\u503C"),
                        node: decl
                    });
                    return;
                }
                // 是预设的值 -> 有预设的变量 -> 开启了修复 -> 直接修复
                if (context.fix) {
                    decl.value = decl.value.replace(value, presetVariable);
                    return;
                }
                // 是预设的值 -> 有预设的变量 -> 没开修复 -> 报错
                report({
                    ruleName: ruleName,
                    result: postcssResult,
                    message: "".concat(value, "->").concat(presetVariable),
                    node: decl
                });
            });
        };
    });
};
exports.createAllowedListPluginFactory = createAllowedListPluginFactory;
