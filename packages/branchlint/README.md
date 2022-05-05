# @ranwawa/branchlint

## 前言

在项目中统一分支命名规则的好处

- 语义化的分支名便于代码 review
- 格式化的分支名可有效整合其他 ci 工具

## 1. 项目配置

### 1.1 安装依赖

#### 1.1.1 安装@ranwawa/branchlint

```shell
npm install --save-dev @ranwawa/branchlint
```

#### 1.1.2 验证 branchlint 是否生效

```shell
npx branchlint

            分支名命令格式不符合要求(...)

            期望的: 分支名只能以feat和fix开头
            实际的: master
```

### 1.2 本地自动验证分支命名

像上面这样手动验证分支名是否符合规范,非常麻烦.每次推送代码到远程之前,可通过 husky 进行自动验证.

#### 1.2.1 在 npm 生命周期中自动激活 husky

```shell
npm set-script prepare "husky install"
```

#### 1.2.2 手动激活 husky

```shell
npm run prepare
```

#### 1.2.3 在 husky 生命周期中自动执行 branchlint

```shell
npx husky add .husky/pre-push 'npx --no-install branchlint'
```

#### 1.2.4 验证 husky 是否配置成功

```shell
git add .husky/pre-push
git commit -m "build: 通过husky自动运行branchlint进行验证"
git push
```

### 1.3 服务端自动验证分支命名

## 2. 配置文件

## 3. 默认配置

![](https://raw.githubusercontent.com/ranwawa/document/master/img/20220505-114809.jpeg)
