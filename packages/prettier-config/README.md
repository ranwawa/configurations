## 1.1 代码格式化

### 1.1.1 规范细则

#### 换行符使用`lf`

> WHY

- 避免window和mac同时开发引发的git冲突



#### 一行最宽80个字符

> BAD

```javascript
const a = 'Ran wawa is a frontend developer that have more than three years expirence in vue & react.' + 'Will you hire him to your company?';
```

> GOOD

```javascript
const a = 
  'Ran wawa is a frontend developer that have more than three years expirence in vue & react.' + 
  'Will you hire him to your company?'
```

> WHY

- 前端一般都是分屏开发,HTML,SCRIPT,CSS独占一个编辑器窗口
- 太宽了难以滚动阅读.
- 所以超过80个字符就要换行



#### 缩进宽度2个空格

> BAD

```javascript
function handsomer () {
    const name = 'ranwawa';
    const age = 18;
}
```

> GOOD

```javascript
function handsomer () {
  const name = 'ranwawa';
  const age = 18;
}
```

> WHY

- tab和空格混用,肉眼看不出来,但git提交时会产生冲突,所以要禁用tab
- 前端HTML层级以及回调函数层级比较多,4个缩进容易超出80个最宽限制.所以使用2个空格缩进.



#### 语句结尾使用分号

> BAD

```javascript
const a = 1
a++
++a
```

> GOOD

```javascript
const a = 1;
a++;
++a;
```

> WHY:

- 不使用分号,在某些情况下会引发BUG,所以每条语句结束都要使用分号



#### 字符串使用单引号

> BAD

```javascript
const name = "ranwawa";
```

> GOOD

```javascript
const name = 'ranwawa';
```

> WHY

- 双引号需要`Shift` + `'`
- 而单引号则可以少按一个键,可节约开发时间



#### 对象属性只在必要时使用引号

> BAD

```javascript
const handsomer = {
  'name': 'ranwawa',
  'real-age': 18,
}
```

> GOOD

```
const handsomer = {
  name: 'ranwawa',
  'real-age': 18,
}
```

> WHY

- 可减少大量开发时间



#### 多行对象结尾加逗号

> BAD

```javascript
const handsomer = {
  name: 'ranwawa',
  age: 18
}
```

> GOOD

```javascript
const handsomer = {
  name: 'ranwawa',
  age: 18,
}
```

> WHY

- 保持统一,避免git冲突



#### 单行对象括号之间保留空格

> BAD

```javascript
const handlesomer = {name: 'ranwawa', age: 18};
```

> GOOD

```
const handlesomer = { name: 'ranwawa', age: 18 };
```

>  WHY

- 操作符两边以及逗号之后会有一个空格
- 保持括号之间有空格更加统一



#### 箭头函数的参数始终用括号包起来

> BAD

```javascript
const func = x => x;
```

> GOOD

```javascript
const func = (x) => x;
```

WHY:

- 便于在ts类型或参数有默认值时的风格统一



#### HTML属性使用单引号

> BAD

```html
<div title="ranwawa" data-id=123></div>
```

> GOOD

```html
<div title='ranwawa' data-id='123'></div>
```

> WHY

- 节约开发时间 
- 保持和vue/react等框架的统一



#### HTML结点`>`多行时要换行显示

> BAD

```react
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}>
  Click Here
</button>
```

> GOOD

```react
<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>
```

> WHY

- 属性和内容分开展示,便于CR



#### HTML中的空白始终用转义符替代

> BAD

```html
<div>
  name: ranwawa  <span>age: 18 </span>
</div>
```

> GOOD

```html
<div>
  name:&ensp;ranwawa&ensp;&ensp;
  <span>age:&ensp;18</span>
</div>
```

> WHY

- 避免CSS空白属性不一致导致的界面异常



#### VUE sciprt/style标签不进行缩进

> BAD

```vue
<script>
  export default {}
</script>
<style>
  div {
    color: red;
  }
</style>
```

> GOOD

```vue
<script>
export default {}
</script>
<style>
div {
  color: red;
}
</style>
```

> WHY:

- 减少缩进层次,避免内部代码超过80个字符宽度的限制



### 1.1.2 Prettier配置

#### Prettier配置文件

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

#### git pre-commit中应用

1. 安装[prettier](https://prettier.io/docs/),并配置

```bash
npm install --save-dev prettier ranwawa-prettier
echo "module.exports = { ...require('ranwawa-prettier') };" > .prettierrc.js
```

2. 安装[lint-staged](https://github.com/okonet/lint-staged),并配置

```bash
npm install --save-dev lint-staged
```

> .lintstagedrc

```json
{
  ".{js, jsx, ts, tsx, vue, json, css, scss, sass, html, md, yaml}": "prettier --write"
}
```

3. 安装[husky](https://typicode.github.io/husky/#/),并配置

```bash
npm install --save-dev husky
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```



4. 修改文件,commit时即可自动格式化

