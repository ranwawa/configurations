1. styleint report 函数上报的异常,在终端显示不全(20220221)

**问题描述**

如题,有点儿像自动截断了字符,也好像是对中文支持不好

**源代码**

```javascript
const messages = ruleMessages(ruleName, {
  expected: (unfixed, fixed) => `用${fixed}替换${unfixed}`,
});

report({
  ruleName,
  result: postcssResult,
  message: messages.expected('14px', 'xxx'),
  node: decl,
  word: 'xxx',
});
```

**输出效果**

```bash
exmaples/test-a.css
 2:2  ✖  用xxx替换1     ranwawa/specify-font-size
```

**期望效果**
2:2 ✖ 用 xxx 替换 14px ranwawa/specify-font-size

```

```

2. vscode stylelint 插件无法识别自定义插件的错误

**问题描述**

通过 stylelint 命令行可以正常 report 错误

**错误截图**

![](markdown-imgs/2022-02-21-17-27-25.png)

**期望效果**

在 font-size 上也同样输出错误信息,并且显示 fix 按钮
