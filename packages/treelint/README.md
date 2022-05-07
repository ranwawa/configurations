# @ranwawa/treelint

## 前言

固定项目目录及文件结构的好处

- 按指定规则划分目录及文件结构,便于快速掌握项目概况
- 规范的目录及文件结构,降低团队协作的沟通成本

## 1. 项目配置

### 1.1 快速上手

#### 1.1.1 安装@ranwawa/treelint

```shell
npm install --save-dev @ranwawa/treelint
```

#### 1.1.2 验证 treelint 是否安装成功

```shell
npx treelint

没有找到配置文件
```

### 1.2 本地自动验证文件结构

像上面这样手动验证文件结构是否符合规范,非常麻烦.每次推送代码到远程之前,可通过 husky 进行自动验证.

#### 1.2.1 在 npm 生命周期中自动激活 husky

```shell
npm set-script prepare "husky install"
```

#### 1.2.2 手动激活 husky

```shell
npm run prepare
```

#### 1.2.3 在 husky 生命周期中自动执行 treelint

```shell
npx husky add .husky/pre-push 'npx --no-install treelint'
```

#### 1.2.4 验证 husky 是否配置成功

```shell
git add .husky/pre-push
git commit -m "build: 通过husky自动运行treelint进行验证"
git push
```

### 1.3 服务端自动验证文件结构

#### 1.3.1 配合 gitlab-ci 使用

在项目根目录创建`gitlab-ci.yml`文件

```yaml
image: node:latest

cache:
  paths:
    - node_modules

stages:
  - 'prepare'
  - 'lint'

install:
  stage: 'prepare'
  script: npm ci

lint:tree:
  stage: 'lint'
  script:
    - npx --no-install @ranwawa/treelint
```

## 2. 配置文件

treelint 会自动搜索配置文件

- package.json 中的 treelint 属性
- `.treelintrc`文件
- `.treelintrc.json`文件
- `.treelintrc.yaml`文件
- `.treelintrc.yml`文件
- `.treelintrc.js`文件
- `treelint.config.js`文件

### 2.1 示例

### 2.1.1 .treelintrc.json

```json
{
  "node_modules": "directory",
  "src": {
    "assets": {
      "img": {
        "^[a-z0-9-].jpg$": "regexp"
      }
    },
    "app.vue": "file",
    "index.js": "file"
  }
}
```

### 2.1.2 .treelintrc.js

```javascript
module.exports = {
  node_modules: 'directory',
  src: {
    assets: {
      img: {
        '^[a-z0-9-].jpg$': 'regexp',
      },
    },
    'app.vue': 'file',
    'index.js': 'file',
  },
};
```

### 2.2 规则

配置文件是个对象,属性名即期望的文件名.属性值对应该文件的类型.

#### 2.2.1 属性值

属性值有两种类型

- 字符串
  - file: 文件
  - directory: 目录(不会进行递归遍历)
  - regexp: 正则表达式
    - 当文件不符合显示声明的规则时,会通过正则表达式进行验证
- 对象: 会进行递归遍历

## 3. vue2.x 项目文件结构规范

## 4. react 项目文件结构规范

## 5. lerna 项目文件结构规范
