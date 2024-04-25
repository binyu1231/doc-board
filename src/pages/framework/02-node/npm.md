---
title: npm
index: Framework.Node.Syntax
---


## 常用命令

- 查看配置: `npm config get`
- 删除配置: `npm config delete electron_mirror`
- 查看全局安装地址: `npm root -g`


## 修改全局安装路径和缓存路径

- 修改全局安装路径 需要添加到环境变量中
- 单独配置全局安装路径后，切换node版本也不需要重新安装全局包

``` bash
PATH/node$ mkdir node_global node_cache
$ npm config set prefix "PATH/node/node_global"
$ npm config set cache "PATH/node/node_cache"


$ pnpm config set global-bin-dir "PATH/node/node_global"

```

## 修改个别项目的下载路径

1. 命令行修改全局变量

``` bash
$ npm config set electron_mirror https://registry.npmmirror.com/mirrors/electron/
$ npm config set cypress_mirror https://registry.npmmirror.com/mirrors/cypress/

$ npm config set node_sass_mirror https://registry.npmmirror.com/mirrors/node-sass/
$ npm config set electron_builder_binaries_mirror https://registry.npmmirror.com/mirrors/electron-builder-binaries/
```

2. 手动修改全局变量

> `xxx_mirror` is not a valid npm option

- `npm config edit` 

```
sharp_binary_host = "https://npmmirror.com/mirrors/sharp/"
sharp_libvips_binary_host = "https://npmmirror.com/mirrors/sharp-libvips/"
```


3. 在项目中 `.npmrc` 修改

``` bash
# For electron-builder
# https://github.com/electron-userland/electron-builder/issues/6289#issuecomment-1042620422
shamefully-hoist=true

# For China 🇨🇳 developers
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://registry.npmmirror.com/mirrors/electron-builder-binaries/
```



## 切换镜像源

``` bash
$ npm i -g nrm

$ nrm ls

# npm ---------- https://registry.npmjs.org/
# yarn --------- https://registry.yarnpkg.com/
# tencent ------ https://mirrors.cloud.tencent.com/npm/
# cnpm --------- https://r.cnpmjs.org/
# taobao ------- https://registry.npmmirror.com/
# npmMirror ---- https://skimdb.npmjs.com/registry/

$ nrm use taobao
```

## 切换 Node 版本

### NVM (Windows)

下载安装: <https://github.com/coreybutler/nvm-windows>

- 先删除原始安装的 node
- 1.1.9 自定义目录无效

``` bash
# 安装
$ nvm install 16

# 查看安装版本
$ nvm ls
# 16.18.0
# 14.20.1

# 查看当前使用版本
$ nvm current

# 使用某版本 必须用完整版本号
$ nvm use 16.18.0

```

- windows 设置环境变量
    1. `win` + `r`
    2. `sysdm.cpl`
    3. 高级 - 环境变量

### N (Mac Linux)

``` bash
# 安装
$ npm i -g n
```


## 版本号的含义

`(Decoration)Major.Minor.Patch(Suffix)`

- Major: 重大版本升级，破坏性更新（不兼容）
- Minor: 添加了新特性（向下兼容）
- Patch: 补丁更新，bug修复（向下兼容）
- Decoration:
    - `~M.m.P`: 只能升级Patch(P) 版本
    - `^M.m.P`: 可升级Patch(P), Minor(m) 版本
    - `M.m.P` or `@M.m.P`: 不可升级，锁定特定版本
    - `*`: 可升级 Major(M), Minor(m), Patch(P) 版本
- Suffix: 重要模块为了保证稳定，会在放出正式版本之前提供先行版本
    - `M.m.P-alpha.n`: 内部测试版，主要给开发和测试找bug用
    - `M.m.P-beta.n`: 公开测版本，主要用于给用户提前体验一些功能
    - `M.m.P-rc.n`: `Release candidate` 正式版本的候选版本，可以理解为预览版，不会再增加新功能，再改一些小bug，就会到正式的版本了