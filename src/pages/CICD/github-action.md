---
title: Github Action
---

- Github Action 市场: <https://github.com/marketplace?type=actions>
- workflow 字段文档: <https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions>



## 结构

- workflow
- job
- step
- action

> .github/workflow/demo.yml


```

- workflow
  |- job1
  |   |- step1.1
  |   |- step1.2
  |     |- action1.2.1
  |     |- action1.2.2
  |     |- action...
  |   |- step...
  |- job2?
  |- job...
```


## 版本

```
actions/setup-node@74bc508 # 指向一个 commit
actions/setup-node@v1.0    # 指向一个标签
actions/setup-node@master  # 指向一个分支
```

### on

触发条件

- 触发工作流的事件: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows



```ts
on:
  push:
  schedule:
    - cron: '0 21 * * *'
```




``` bash
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *
```

|Operator|Description|Example|
|:---|:---|:---|
|`*`|Any value| `15 * * * *` 每天的每一个小时的第15分钟执行|
|`,`|Value list separator|`2,10 4,5 * * *` 每天的第4, 第5小时的第2, 第10分钟执行|
|`-`|Range of values|`30 4-6 * * *` 每天的第4-6小时(即4, 5, 6)的第30分钟执行|
|`/`|Step values|`20/15 * * * *` 从每天的每一个小时的第20分钟开始间隔15分钟执行一次, 到59分为止(即第20, 第35, 第50分中)|

NOTE:

- 北京时间: 北京处于东8区 `(utc + 8) % 24`, `0 21 * * *` 则代表 `(21+8)%24 = 5` 北京时间早上5点钟.
- github action 最小的执行间隔为5分钟
- Github Action 的任务一般集中设置在整点, 所以可以适当调节分钟错开使用高峰


当你想复用某些工作流, 并在其中添加一些条件分支时

``` yml
name: Demo

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    ...
    
  release:
    if: startsWith(github.ref, 'refs/tags/')
    runs-on: ubuntu-latest
```

### 环境变量与秘钥

action 提供了虚拟环境的写权限秘钥,只要在env中声明即可

``` yml
#...
  env:
    GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}} # 为写权限提供秘钥
```

其他自定义秘钥, 比如高德地图的token, 可以前往项目的 settings/Security/Secrets and variables/Actions 添加. 使用则如 GITHUB_TOKEN 一致


``` yml
# 声明为环境变量
  env: 
    WEATHER_API_TOKEN: ${{ secrets.WEATHER_API_TOKEN }}

# 直接使用
  - name: 'Send Mail'
    uses: dawidd6/action-send-mail@master
    with: 
      server_address: smtp.qq.com
      server_port: 465
      username: ${{ secrets.MAIL_USERNAME }}
      password: ${{ secrets.MAIL_PASSWORD }}
```



### release 

关于[声明式提交](/framework/git/commit-message)

``` yml
name: Release Project

# 生成 changelog 时需要写权限
permissions:
  contents: write

on: 
  push:
    tags:
      - v** # 当添加标签,并且标签以v开头时,执行下面的jobs

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}} # 为写权限提供秘钥

    steps:
        # 拉取代码
      - name: 'Checkout codes'
        uses: actions/checkout@v3
        with:
          # 获取最新的代码, 可以减少程序消耗, 并且 changelogithub 也必须指定该参数
          fetch-depth: 0

        # 安装 node 环境
      - name: 'Install Node'
        uses: actions/setup-node@v3
        with:
          # 指定 node 版本
          node-version: 16

        # 安装项目依赖
      - name: 'Install dependencies'
        run: npm install
      - name: 'Build'
        run: npm run build

        # 根据commit信息,生成changelog, 提交规范参考 约定式提交规范
        # 只会添加 feat, fix 的提交到 changelog 中
        # 此步骤需要 `GITHUB_TOKEN`
      - name: 'Gen changelog'
        run: npx changelogithub@0.12
        
        # 压缩项目文件夹
      - name: 'Compress dist'
        run: zip -q -r dist.zip ./dist
      
        # 将目标文件上传至 release 的 assets 中
        # 此步骤需要 `GITHUB_TOKEN`
      - name: 'Upload release assets'
        uses: softprops/action-gh-release@v1
        with:
          files: |
            dist.zip
```

### 不同平台打包或编译

``` yml

# ...

jobs:
  release:
    name: build and release electron app
    runs-on: ${{ matrix.os }}
    env:
      GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}

    # 声明策略
    strategy:
      fail-fast: false
      matrix:
        os: [windows-latest, macos-latest]
    
    # ... checkout 
    # ... build
    - name: Cleanup Artifacts for Windows
        if: matrix.os == 'windows-latest'
        run: |
          npx rimraf "release/!(*.exe)"
      
    - name: Cleanup Artifacts for MacOS
      if: matrix.os == 'macos-latest'
      run: |
        npx rimraf "release/!(*.dmg)"

      - name: 'Gen changelog'
      run: |
        npx changelogithub@0.12

    - name: release
      uses: softprops/action-gh-release@v1
      # if: startsWith(github.ref, 'refs/tags/')
      with:
        files: |
          release/*.exe
          release/*.dmg
```