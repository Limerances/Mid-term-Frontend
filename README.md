### Mac 安装步骤

#### 环境安装

```shell
brew install nvm
nvm list-remote
nvm install 16.15.1
npm --version
npm config get registry
npm install -g nrm
nrm ls
nrm use taobao
```

#### 项目加载

切换到项目目录下

```shell
npm install
npm install crypto-js
npm install mui-image
```

运行

```shell
npm run dev
```

#### 值得关注的文件

```shell
src/components/dashboard/layout/config.ts
```

