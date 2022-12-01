
[[toc]]

node API

## EventEmitter

``` js
const EventEmitter = require('event')
const emitter = new EventEmitter()

emitter.on([eventName],  [callback])
emitter.once([eventName],  [callback])

emitter.emit([eventName], callbackArguments)
```

## Fs

``` javascript
const fs = require('fs')

// 目录/文件信息
fs.stat([dir], [callback<error, stats>])
  stats.isFile<bool>()
  stats.isDirectory<bool>()

// 创建目录
fs.mkdir([dirName], [callback<error>])
fs.mkdirSync([dirName])

// 写入文件(创建或覆盖)
fs.writeFile([dirName], [fileContent], [callback<error>])
// 写入文件(创建或追加)
fs.appendFile([dirName], [appendContent], [callback<error>])

// 读取文件 
fs.readFile([dirName], [callback<error, bufferData>])  //可用 toString 方法转化 bufferData
fs.readFile([dirName], [type], [callback<error. typeData>]) // type: 'utf8'

// 读取目录信息
fs.readdir([dir], [callback<error, files>]) //files: [ 'hello.log', 'subLogs' ]

// 修改目录/文件名
fs.rename([oldDir], [newDir], [callback<error>])

// 删除空目录
fs.rmdir([dir], [callback<error>])

// 删除文件
fs.unlink([dirName], [callback<error>])

// eg: 递归删除
function forceRemove (dir) {
  const sub = fs.readdirSync(dir)
  .map(d => dir + '/' + d)
  .map(dname => fs.statSync(dname).isDirectory() ? 
    forceRemove(dname) : fs.unlinkSync(dname)
  )
  .filter(res => res !== undefined)

  return sub.length === 0 ? fs.rmdirSync(dir) : new Error('删除失败')
}

// 读取流 分次读入减少内存占用，防止崩溃
fs.createReadStream([fileName]) => readStream
readStream.on('data', [callback<dataChunk>])
readStream.on('end', [callback])
readStream.on('error', [callback<error>])
readStream.pipe(writeStream)

// 写入流
fs.createWriteStream([fileName]) => writeStream
writeStream.on('pipe', [callback<source>])
writeStream.write([dataChunk])
```


## Zlib

```js
const zlib = require('zlib')

zlib.createGzip() => ???  可传入pipe
```

## http

```js
const http = require('http')

// 网络请求
const options = {
  protocol: 'http:',
  hostname: 'api.douban.com',
  port: '80',
  method: 'GET',
  path: '/v2/movie/top250'
}

http.request(options, [callback<responseStream>]) => request 
request.on('error', [callback<error>])
request.end()

responseStream.setEncoding([typeString]) // typeString: 'utf8'
responseStream.on('data', [callback<dataChunk>])

// 服务器
http.createServer() => server
server.on('request', [callback<request, response>])
server.listen([port])

```


## path

```js
const path = require('path')

path.resolve([startPath], [aimPath])
```

使用项目内依赖的命令工具


```js
package.json

{
  // ...
  "scripts": {
     "start": "./node_modules/.bin/nodemon index.js"
  }
}
```

使用es6

1. 安装需要的 package

```bash
$ npm i babel-cli babel-preset-es2015 babel-preset-stage-0 nodemon -y -D
```

2. 配置 `.babelrc`

```json
{ "presets": [ "es2015", "stage-0" ] }
```

3. 配置package.json

``` js
{
  //...
  "scripts": {
    "start": "./node_modules/.bin/nodemon --exec babel-node index.js" 
    // 自动编译重启，所有可执行命令都在 ./node_modules/.bin/ 目录下
  }
}
```

### PM2 启动 es6 项目
``` bash
# 全局安装 pm2 和 babel-cli
$ npm i -g pm2 babel-cli

# 添加软连接
# node 的路径根据本机路径填写
$ ln -s /usr/local/src/node-v8.11.1-linux-x64/bin/babel-node /user/bin/babel-node
$ ln -s /usr/local/src/node-v8.11.1-linux-x64/bin/pm2 /usr/bin/pm2

# 启动
$ pm2 start --interpreter babel-node app.js
```