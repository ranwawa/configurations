# 1.1 代码格式化

## 1. 项目配置

### 1.1 安装依赖

### 1.1.1 安装[prettier](https://prettier.io/docs/)

```bash
npm install --save-dev prettier
```

### 1.1.2 安装[prettier 配置文件](https://www.npmjs.com/package/@ranwawa/prettier-config)

```bash
npm install --save-dev @ranwawa/prettier-config
```

### 1.1.3 初始化 prettier 配置文件

```bash
echo "module.exports = {...require('@ranwawa/prettier-config')};" > .prettierrc.js
```

### 1.1.4 验证 prettier 配置是否生效

```bash
prettier --write .prettierrc.js

# 输出以下信息,表示配置生效
.prettierrc.js 32ms
```

## 1.2 在 husky 中集成 prettier

每次编写代码后,手动运行命令格式化代码.这种操作明显很麻烦. 所以我们需要集成 husky,在每次提交 commit 之前自动格式化代码.

### 1.2.1 安装[husky](https://typicode.github.io/husky/#/)

```bash
npm install --save-dev husky
```

### 1.2.2 在 npm 生命周期中自动激活 husky

```bash
npm set-script prepare "husky install"
```

### 1.2.3 手动激活 husky

```bash
npm run prepare
```

### 1.2.4 安装[lint-staged](https://github.com/okonet/lint-staged)

```bash
npm install --save-dev lint-staged

```

### 1.2.5 初始化 lint-staged 配置文件

```bash
echo '{"*.{js,jsx,ts,tsx,vue,json,css,scss,sass,html,md,yaml,yml}": "prettier --ignore-unknown --write"}' > .lintstagedrc.json
```

### 1.2.6 在 husky 生命周期中自动执行 prettier

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### 1.2.7 验证 husky 配置是否生效

```bash
git add .lintstagedrc.json
git commit -m "build: 初始化lintstage配置文件"

# 输出以下信息,表示配置生效
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
[main 56596b1] build: 初始化lintstage配置文件
 1 file changed, 3 insertions(+), 1 deletion(-)
```

## 1.3 在 gitlab-ci 中集成 prettier

## 2. 规范细则

## 2.1 换行符使用`lf`

- WHY

避免 window 和 mac 同时开发引发的 git 冲突

## 2.2 一行最宽 80 个字符

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

## 2.3 缩进宽度 2 个空格

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

## 2.4 语句结尾使用分号

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

## 2.5 字符串使用单引号

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

## 2.6 对象属性只在必要时使用引号

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

## 2.7 多行对象结尾加逗号

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

## 2.8 单行对象括号之间保留空格

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

## 2.9 箭头函数的参数始终用括号包起来

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

## 2.10 HTML 属性使用单引号

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

## 2.11 HTML 结点`>`多行时要换行显示

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

## 2.12 HTML 中的空白始终用转义符替代

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

## 2.13 VUE sciprt/style 标签不进行缩进

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
