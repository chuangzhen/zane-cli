# 学习搭建一个个人的cli脚手架 npm包


## 安装
### 全局安装
#### npm
```bash
npm install -g zane-cli
```
#### yarn
```bash
yarn global add zane-cli
```

## 使用
### 全局按照后
创建模版
```bash
zane-cli create <name> [-t|--template]
```
示例
```bash
zane-cli create my-vue-app -t vue3-webpack5-ts-template
```

### 不全局安装，借助npx
创建模版
```bash
npx zane-cli create <name> [-t|--template]
```
示例
```bash
npx zane-cli create my-vue-app -template vue3-webpack5-ts-template
```

