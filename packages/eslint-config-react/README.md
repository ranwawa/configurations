# @ranwawa/eslint-config-react

## 前言

使用 eslint 的好处:

- 避免出现低级语法错误,保证代码质量
- 潜移默化改善编码习惯,提升专业技能

## 1. 项目配置

### 1.1 安装依赖

会自动安装相关依赖

- `eslint`
  - 格式化工具
- `eslint-config-airbnb`
  - airbnb 公司维护的 js 规则
- `eslint-config-airbnb-typescript`
  - airbnb 公司维护的 ts 规则
- `eslint-config-prettier`
  - prettier 维护的格式化规则
- `eslint-plugin-prettier`
  - prettier 维护的自动修复插件
- `husky`
  - git 钩子工具
- `lint-staged`
  - 针对未提交文件的 git 钩子工具

#### 1.1.1 安装 eslint 配置文件

```bash
npm install --save-dev @ranwawa/eslint-config-react
```

#### 1.1.2 初始化 eslint 配置文件

```bash
echo "const config=require('@ranwawa/eslint-config-react');module.exports = {...config};" > .eslintrc.js
```

#### 1.1.3 初始化 typescript 配置文件

```bash
echo "{\"include\":[\".eslintrc.js\"]}" > tsconfig.json
```

#### 1.1.4 验证 eslint 配置是否生效

```bash
npx eslint .eslintrc.js

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
