# @ranwawa/commitlint-config

- [前言](#前言)
- [1. 项目配置](#1-项目配置)
  - [1.1 安装依赖](#11-安装依赖)
  - [1.2 自动验证 commit 信息](#12-自动验证-commit-信息)
  - [1.3 使用辅助工具自动填写 commit 信息](#13-使用辅助工具自动填写commit信息)
  - [1.4 集成 gitlab-ci](#14-集成-gitlab-ci)
- [2. commit message 规范](#2-commit-message-规范)
  - [2.1 type](#21-type)
  - [2.2 subject](#22-subject)
  - [2.3 body](#23-body)
- [3. commitlint 详细配置](#3-commitlint-详细配置)

## 前言

在所有项目中使用同样风格的 message 信息的好处

- 内容明确,便于 review
- 格式统一,方便输出 changelog

## 1. 项目配置

### 1.1 安装依赖

#### 1.1.1 安装 commitlint 配置文件

```bash
npm install --save-dev @ranwawa/commitlint-config
```

该命令会安装如下包及其依赖

- `@commitlint/cli`
  - 用于验证 commit message 的命令行工具
- `@ranwawa/commitlint-config`
  - commitlint 的配置文件
- `husky`
  - 自动验证 commit message 的命令行工具
- `git-cz`
  - 快速提交标准 commit message 信息的命令行工具
- `@ranwawa/git-cz-config`
  - git-cz 配置文件

#### 1.1.2 初始化 commitlint 配置文件

```bash
echo "module.exports = { extends: ['@ranwawa/commitlint-config'] };" > commitlint.config.js
```

#### 1.1.3 验证 commitlint 配置是否生效

```bash
# 提交一个错误的commit message
git add package.json
git commit -m "安装commitlint相关依赖"
npx commitlint --from HEAD~1 --to HEAD --verbose

⧗   input: 安装commitlint相关依赖
✖   type may not be empty [type-empty]
✖   subject may not be empty [subject-empty]
```

```bash
# 提交一个正确的commit message
git add commitlint.config.js
git commit -m "build: 初始化commitlint配置文件"
npx commitlint --from HEAD~1 --to HEAD --verbose

⧗   input: build: 初始化commitlint配置文件
✔   found 0 problems, 0 warnings
```

### 1.2 自动验证 commit 信息

像上面这样手动验证 commit message 是否符合规范,非常麻烦

通过 husky 在每次提交之前,可以进行自动验证

#### 1.2.1 在 npm 生命周期中自动激活 husky

```bash
npm set-script prepare "husky install"
```

#### 1.2.2 手动激活 husky

```bash
npm run prepare
```

#### 1.2.3 在 husky 生命周期中自动执行 commitlint

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

#### 1.2.4 验证

```bash
# 提交一个错误的commit message
git add .husky/commit-msg
git commit -m "通过husky自动运行commitlint进行验证"

⧗   input: 通过husky自动运行commitlint进行验证
✖   type may not be empty [type-empty]
✖   subject may not be empty [subject-empty]
```

```bash
# 提交一个正确的commit message
git add .husky/commit-msg
git commit -m "build: 通过husky自动运行commitlint进行验证"

[master 165caaf] build: 通过husky自动运行commitlint进行验证
 1 file changed, 4 insertions(+)
 create mode 100755 .husky/commit-msg
```

### 1.3 使用辅助工具自动填写 commit 信息

像上面这样每次都要手动输入 build: 巴拉巴拉巴拉,还是比较麻烦

通过 git-cz 可以通过选择的方式提高输入效率

#### 1.3.1 初始化 git-cz 配置文件

```bash
echo "module.exports = require('@ranwawa/git-cz-config');" > changelog.config.js
```

#### 1.2.2 在 npm 中添加 git-cz 命令

```bash
npm set-script commit "git-cz"
```

#### 1.3.3 验证

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

### 1.4 集成 gitlab-ci

上面的检验只能在客户端完成,可能会因为各种原因失效

所以把检验工作放在服务端的 git 仓库中自动完成,更加可靠

#### 1.4.1 gitlab-ci 配置

验证 master 分支最近一次提交之后的所有 commit message 信息

```yaml
stages:
  - lint

variables:
  MASTER_LATEST_COMMIT_ID: ''

before_script:
  - MASTER_LATEST_COMMIT_ID=$(git rev-parse origin/master)

lint-commit-msg:
  stage: lint
  script:
    - npx commitlint --from $MASTER_LATEST_COMMIT_ID
```

## 2. commit message 规范

```text
type: subject

body?
```

### 2.1 type

当前提交类型(必填)

只能是以下范围中的一个,以冒号结尾:

- feat: 新功能
- fix: bug 修复
- test: 增加测试用例
- refactor: 重构代码(既不是新增功能也不是修复 bug)
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
内容不超过 200 字

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
如果一个提交逻辑比较复杂,subject 无法描述时,则可以在此添加更加完善的描述信息

#### 2.3.1 和 subject 之间保留一个空行

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

## 3. commitlint 详细配置

|                      | type                                                                 | scope                       | subject           | header             | body              | Footer          |
| -------------------- | -------------------------------------------------------------------- | --------------------------- | ----------------- | ------------------ | ----------------- | --------------- |
| enum: type 枚举值    | [2, 'feat', 'fix', 'test', 'refactor', 'style', 'docs', 'build/ci']] | [0, 'alwys', []]            |                   |                    |                   |                 |
| case: 大小写         | [2, 'always', 'lower-case']                                          | [2, 'always', 'lower-case'] | [0, 'always', []] | [0, 'always', []]  | [0, 'always', []] |                 |
| empty: 空            | [2, 'never']                                                         | [0, 'never']                | [2, 'never']      |                    | [0, 'never']      | [0, 'never']    |
| max-length: 最大长度 | [0, 'never', 0]                                                      | [0, 'never', 0]             | [0, 'never', 0]   | [2, 'always', 200] | [0, 'never', 0]   | [0, 'never', 0] |
| min-length: 最小长度 | [0, 'never', 0]                                                      | [0, 'never', 0]             | [0, 'never', 0]   | [0, 'never', 0]    | [0, 'never', 0]   | [0, 'never', 0] |
| full-stop: 结束符号  |                                                                      |                             | [0, 'never', '.'] | [0, 'never', '.']  | [0, 'never', '.'] |                 |
| blank: 起始换行      |                                                                      |                             |                   |                    | [2, 'always']     |                 |
| max-line-length      |                                                                      |                             |                   |                    | [0, 'never', 0]   | [0, 'never', 0] |
| leading-blank        |                                                                      |                             |                   |                    | [2, 'always']     | [2, 'always']   |
