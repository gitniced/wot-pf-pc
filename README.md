### 简介

集成框架

### git submodule 使用说明

<https://blog.csdn.net/weixin_48704094/article/details/130521835>

#### 拉取框架

```js
git clone https://codeup.aliyun.com/hzwotu/platform/fe-framework/platform-pc.git
```

#### 拉取所有子模块代码

```js
node modulePull.js
```

#### 单独仓库提交

```js
1、子仓库提交
cd 目标项目
git add .
git commit -m '提交描述'
git push

2、主仓库更新
cd 根目录
git add .
git commit -m '提交描述'
git push
```

#### 批量提交

```js
1、子仓库批量提交
git submodule foreach 'git add .'
git submodule foreach 'git commit -m "提交描述"'
git submodule foreach 'git push'

2、主仓库更新
git add .
git commit -m '提交描述'
git push
```

#### 批量拉取

```js
git submodule foreach 'git pull'
或者
git submodule init
git submodule update
```

### 安装 turbo

```tsx | pure
npm i -g turbo@1.10.14
```

### 安装

pnpm i

### 为指定项目安装包

```tsx | pure
pnpm add 依赖名 --filter 项目名
```

### 为所有项目安装相同依赖

```tsx | pure
lerna exec "pnpm i 依赖名"
```

### 自定义运行命令

```tsx | pure
npm run createTurbo
```

#### 第一步 设置运行命令名

#### 第二步 选择需要运行的项目

#### 第三步 运行自定义的命令

### 运行

##### 预先设置接口环境和站点

```
npm run {'local'|'test'|'pre'|'pro'} {'站点别名'}
```

##### 将当前环境指定为资源方用户

```
npm run {'local'|'test'|'pre'|'pro'} {'站点别名'} 1
```

##### 运行流水线

1、门户流水线 命令: npm run portal

```
涉及项目：
fe-organization-pc
fe-user-pc
fe-enroll-pc
fe-exam-pc
```

2、工作台流水线 命令: npm run work

```
涉及项目：
fe-business-pc
fe-user-pc
fe-enroll-pc
fe-exam-pc
organization
trading-center
fe-organization-pc
```

3、用户中心流水线 命令: npm run user

```
涉及项目：
fe-user-pc
organization
trading-center
```
