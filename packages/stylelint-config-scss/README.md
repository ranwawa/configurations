# @ranwawa/stylelint-config-scss

## 前言

使用 stylelint 的好处:

- 避免出现低级的语法错误,保证代码质量
- 自动修复常规错误,提升开发效率
- 采用统一的编码风格,减少团队协作成本
- 潜移默化的使用社区最佳实践,提升个人技能

## 1. 项目配置

### 1.1 安装依赖

会自动安装相关依赖

- `stylelint`
  - 检测工具
- `postcss`
  - 转换 AST 的工具
- `postcss-html`
  - 将 vue 等文件中的样式提取出来的工具
- `stylelint-config-prettier`
  - prettier 维护的格式化配置
- `stylelint-config-recess-order`
  - 参照 bootstrap 的排序配置
- `stylelint-config-sass-guidelines`
  - scss 相关配置
- `@ranwawa/stylelint-plugin-ui-convention`
  - ui 风格统一的插件

#### 1.1.1 安装 stylelint 配置文件

```bash
npm install --save-dev @ranwawa/stylelint-config-scss
```

#### 1.1.2 初始化 stylelint 配置文件

```bash
echo "{\"extends\":[\"@ranwawa/stylelint-config-scss\"]}" > .stylelintrc
```

#### 1.1.4 验证 eslint 配置是否生效

```bash
echo "p{margin: 3px;}" > example-test-style.css
npx stylelint ./**/*.{css,scss,jsx,tsx,vue} --allow-empty-input

# 输出以下信息,表示配置生效
1:1   error  Expected 1 empty line after require statement not followed by another require                                                                                    import/newline-after-import
1:13  error  Replace `=require('@ranwawa/eslint-config-react');module.exports·=·{...config` with `·=·require("@ranwawa/eslint-config-react");⏎module.exports·=·{·...config·`  prettier/prettier
```

### 1.2 自动检测代码

像上面这样手动检测代码,非常麻烦

通过 husky 在每次提交之前,可以自动检测,减少重复的人工操作

#### 1.2.1 在 npm 生命周期中自动激活 husky

```bash
npm set-script prepare "husky install"
```

#### 1.2.2 手动激活 husky

```bash
npm run prepare
```

#### 1.2.3 初始化 lint-staged 配置文件

```bash
echo '{"*.{js,jsx,ts,tsx}": "eslint --fix"}' > .lintstagedrc.json
```

#### 1.2.4 在 husky 生命周期中自动执行 eslint

```bash
npx husky add .husky/pre-commit "npx lint-staged --allow-empty"
```

#### 1.2.5 验证 husky 配置是否生效

```bash
git add .eslintrc.js
git commit -m "build: 初始化eslint配置文件"

# 输出以下信息,表示配置生效
✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
[master dfcfb69] build: 初始化eslint配置文件
```

### 1.3 配合编辑器格式化代码

#### 1.3.1 配合 vscode 使用

### 1.4 在服务端自动验证代码格式

上面的检验只能在客户端完成,可能会因为各种原因失效

所以把检验工作放在服务端的 git 仓库中自动完成,更加可靠

#### 1.4.1 配合 gitlab-ci 使用

验证 master 分支最近一次提交之后的所有变更的文件

```yaml
stages:
  - lint

variables:
  MASTER_LATEST_COMMIT_ID: ''

before_script:
  - MASTER_LATEST_COMMIT_ID=$(git rev-parse origin/master)

lint-script:
  stage: lint
  script:
    - npx eslint $(git diff --name-only $MASTER_LATEST_COMMIT_ID "*.js" "*.ts" "*.jsx" "*.tsx")
```

## 2. 规范细则

### 2.1 换行符使用`lf`

- WHY

避免 window 和 mac 同时开发引发的 git 冲突

#### 2.2 一行最宽 80 个字符

- BAD

```javascript
const a =
  'Ran wawa is a frontend developer that have more than three years expirence in vue & react.' +
  'Will you hire him to your company?';
```

- GOOD

```javascript
const a =
  'Ran wawa is a frontend developer that have more than three years expirence in vue & react.' +
  'Will you hire him to your company?';
```

- WHY
  - 前端一般都是分屏开发,HTML,SCRIPT,CSS 独占一个编辑器窗口
  - 太宽了难以滚动阅读.
  - 所以超过 80 个字符就要换行

#### 2.3 缩进宽度 2 个空格

- BAD

```javascript
function handsomer() {
  const name = 'ranwawa';
  const age = 18;
}
```

- GOOD

```javascript
function handsomer() {
  const name = 'ranwawa';
  const age = 18;
}
```

- WHY
  - tab 和空格混用,肉眼看不出来,但 git 提交时会产生冲突,所以要禁用 tab
  - 前端 HTML 层级以及回调函数层级比较多,4 个缩进容易超出 80 个最宽限制.所以使用 2 个空格缩进.

### 2.4 语句结尾使用分号

- BAD

```javascript
const a = 1;
a++;
++a;
```

- GOOD

```javascript
const a = 1;
a++;
++a;
```

- WHY
  - 不使用分号,在某些情况下会引发 BUG,所以每条语句结束都要使用分号

### 2.5 字符串使用单引号

- BAD

```javascript
const name = 'ranwawa';
```

- GOOD

```javascript
const name = 'ranwawa';
```

- WHY
  - 双引号需要`Shift` + `'`
  - 而单引号则可以少按一个键,可节约开发时间

### 2.6 对象属性只在必要时使用引号

- BAD

```javascript
const handsomer = {
  name: 'ranwawa',
  'real-age': 18,
};
```

- GOOD

```javascript
const handsomer = {
  name: 'ranwawa',
  'real-age': 18,
};
```

- WHY
  - 可减少大量开发时间

### 2.7 多行对象结尾加逗号

- BAD

```javascript
const handsomer = {
  name: 'ranwawa',
  age: 18,
};
```

- GOOD

```javascript
const handsomer = {
  name: 'ranwawa',
  age: 18,
};
```

- WHY
  - 保持统一,避免 git 冲突

### 2.8 单行对象括号之间保留空格

- BAD

```javascript
const handlesomer = { name: 'ranwawa', age: 18 };
```

- GOOD

```javascript
const handlesomer = { name: 'ranwawa', age: 18 };
```

- WHY
  - 操作符两边以及逗号之后会有一个空格
  - 保持括号之间有空格更加统一

### 2.9 箭头函数的参数始终用括号包起来

- BAD

```javascript
const func = (x) => x;
```

- GOOD

```javascript
const func = (x) => x;
```

- WHY
  - 便于在 ts 类型或参数有默认值时的风格统一

### 2.10 HTML 属性使用单引号

- BAD

```html
<div title="ranwawa" data-id="123"></div>
```

- GOOD

```html
<div title="ranwawa" data-id="123"></div>
```

- WHY
  - 节约开发时间
  - 保持和 vue/react 等框架的统一

### 2.11 HTML 结点`>`多行时要换行显示

- BAD

```react
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}>
  Click Here
</button>
```

-GOOD

```react
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>
```

- WHY
  - 属性和内容分开展示,便于 CR

### 2.12 HTML 中的空白始终用转义符替代

- BAD

```html
<div> name: ranwawa <span>age: 18 </span> </div>
```

- GOOD

```html
<div>
  name:&ensp;ranwawa&ensp;&ensp;
  <span>age:&ensp;18</span>
</div>
```

- WHY
  - 避免 CSS 空白属性不一致导致的界面异常

### 2.13 VUE sciprt/style 标签不进行缩进

- BAD

```vue
<script>
export default {};
</script>
<style>
div {
  color: red;
}
</style>
```

- GOOD

```vue
<script>
export default {};
</script>
<style>
div {
  color: red;
}
</style>
```

- WHY
  - 减少缩进层次,避免内部代码超过 80 个字符宽度的限制

## 3. Prettier 配置文件

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "rangeStart": 0,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "strict",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}
```
