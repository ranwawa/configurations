- [前言](#前言)
- [1. 项目配置](#1-项目配置)
	- [1.1 安装依赖](#11-安装依赖)
	- [1.2 在husky中集成commitlint](#12-在husky中集成commitlint)
	- [1.3 使用辅助工具git-cz](#13-使用辅助工具git-cz)
	- [1.4 集成gitlab-ci](#14-集成gitlab-ci)
- [2. commit message规范](#2-commit-message规范)
	- [2.1 type](#21-type)
	- [2.2 subject](#22-subject)
	- [2.3 body](#23-body)
- [3. commitlint详细配置](#3-commitlint详细配置)

## 前言

在所有项目中使用同样风格的message信息的好处

- 内容明确,便于review
- 格式统一,方便输出changelog

## 1. 项目配置

### 1.1 安装依赖

#### 1.1.1 安装commitlint

```bash
npm install --save-dev @commitlint/cli
```

#### 1.1.2 安装commitlint配置文件

```bash
npm install --save-dev @ranwawa/commitlint-config
```

#### 1.1.3 初始化commitlint配置文件

```bash
echo "module.exports = { extends: ['@ranwawa/commitlint-config'] };" > commitlint.config.js
```

#### 1.1.4 验证commitlint配置是否生效

```bash
# 提交一个错误的commit message
git add package.json
git commit -m "安装commitlint相关依赖"
npx commitlint --from HEAD~1 --to HEAD --verbose

⧗   input: 安装commitlint相关依赖
✖   type may not be empty [type-empty]
✖   subject may not be empty [subject-empty]

# 提交一个正确的commit message
git add commitlint.config.js 
git commit -m "build: 初始化commitlint配置文件"

npx commitlint --from HEAD~1 --to HEAD --verbose
⧗   input: build: 初始化commitlint配置文件
✔   found 0 problems, 0 warnings
```

### 1.2 在husky中集成commitlint

每次提交之后,手动运行命令检查commit message是否符合规范.这种操作明显很麻烦.
所以我们需要集成husky,在每次提交commit message之后自动进行检查.

#### 1.2.1 安装husky

```bash
npm install --save-dev husky
```

#### 1.2.2 在npm生命周期中自动激活husky

```bash
npm set-script prepare "husky install"
```

#### 1.2.3 手动激活husky

```bash
npm run prepare
```

#### 1.2.4 在husky生命周期中自动执行commitlint

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

#### 1.2.5 验证

```bash
git add .husky/commit-msg
git commit -m "husky中集成commitlint"

⧗   input: husky中集成commitlint
✖   type may not be empty [type-empty]
✖   subject may not be empty [subject-empty]
```

### 1.3 使用辅助工具git-cz

#### 1.3.1 安装git-cz

```bash
npm install --save-dev git-cz
```

#### 1.3.2 安装git-cz配置文件

```bash
npm install --save-dev @ranwawa/git-cz-config
```

#### 1.3.3 初始化git-cz配置文件

```bash
echo "module.exports = require('@ranwawa/git-cz-config');" > changelog.config.js
```

#### 1.2.4 在npm中添加git-cz命令

```bash
npm set-script commit "git-cz"
```

#### 1.3.5 验证

```bash
git add changelog.config.js
npm run commit

? Select the type of change that you're committing: (Use arrow keys or type to search)
❯ 🎸  feat:       新功能 
  🐛  fix:        bug修复 
  💍  test:       增加测试用例 
  💡  refactor:   重构代码(既不是新增功能也不是修复bug) 
  💄  style:      空格,格式化,分号,文字错误等不影响功能的修改 
  ️📖  docs:       注释,文档等无关代码的修改 
  🎡  build:      构建/持续集成相关的修改 
```

### 1.4 集成gitlab-ci

## 2. commit message规范

```text
type: subject

body?
```

### 2.1 type

当前提交类型(必填)

只能是以下范围中的一个,以冒号结尾:

- feat: 新功能
- fix: bug修复
- test: 增加测试用例
- refactor: 重构代码(既不是新增功能也不是修复bug)
- style: 空格,格式化,分号,文字错误等不影响功能的修改
- docs: 注释,文档等无关代码的修改
- build: 构建/持续集成相关的修改

#### 2.1.1 根据提交内容,选择正确的标签

- BAD

```text
feat: 修复丢失username无法登录的bug
```

- GOOD

```text
fix: 修复丢失username无法登录的bug
```

#### 2.1.2 原子化提交

- BAD

```text
feat: 新增登录功能以及修复首页banner无法滑动的bug
```

- GOOD

```text
feat: 新增登录功能
fix: 修复首页banner无法滑动的bug
```

### 2.2 subject

本次提交的描述信息(必填)
内容不超过200字

#### 2.2.1 描述信息必须有意义

- BAD

```text
feat: 提交msg
```

- GOOD

```text
feat: 新增登录功能
```

#### 2.2.2 描述信息必须清晰具体

- BAD

```text
fix: 修复了一个bug
```

- GOOD

```text
fix: 修复首页banner无法滑动的bug
```

### 2.3 body

本次提交的详细内容(可选)
如果一个提交逻辑比较复杂,subject无法描述时,则可以在此添加更加完善的描述信息

#### 2.3.1 和subject之间保留一个空行

- BAD

```text
fix: 修复首页banner无法滑动的bug
由于`swipe.js`插件版本问题,导致打包之后的压缩文件......
```

- GOOD

```text
fix: 修复首页banner无法滑动的bug

由于`swipe.js`插件版本问题,导致打包之后的压缩文件......
```

## 3. commitlint详细配置

|                      | type                                                         | scope                       | subject           | header             | body              | Footer          |
| -------------------- | ------------------------------------------------------------ | --------------------------- | ----------------- | ------------------ | ----------------- | --------------- |
| enum: type枚举值     | [2, 'feat', 'fix', 'test', 'refactor', 'style', 'docs', 'build/ci']] | [0, 'alwys', []]            |                   |                    |                   |                 |
| case: 大小写         | [2, 'always', 'lower-case']                                  | [2, 'always', 'lower-case'] | [0, 'always', []] | [0, 'always', []]  | [0, 'always', []] |                 |
| empty: 空            | [2, 'never']                                                 | [0, 'never']                | [2, 'never']      |                    | [0, 'never']      | [0, 'never']    |
| max-length: 最大长度 | [0, 'never', 0]                                              | [0, 'never', 0]             | [0, 'never', 0]   | [2, 'always', 200] | [0, 'never', 0]   | [0, 'never', 0] |
| min-length: 最小长度 | [0, 'never', 0]                                              | [0, 'never', 0]             | [0, 'never', 0]   | [0, 'never', 0]    | [0, 'never', 0]   | [0, 'never', 0] |
| full-stop: 结束符号  |                                                              |                             | [0, 'never', '.'] | [0, 'never', '.']  | [0, 'never', '.'] |                 |
| blank: 起始换行      |                                                              |                             |                   |                    | [2, 'always']     |                 |
| max-line-length      |                                                              |                             |                   |                    | [0, 'never', 0]   | [0, 'never', 0] |
| leading-blank        |                                                              |                             |                   |                    | [2, 'always']     | [2, 'always']   |
