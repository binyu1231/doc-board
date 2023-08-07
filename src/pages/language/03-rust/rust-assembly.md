---
title: WebAssembly
---

Rust 一大应用就是编译成 WebAssembly 代码供 JavaScript 使用来提高后者的性能。





## wasm-pack


将 rust 项目打包成 WebAssembly 可调用的程序


### 安装

- 链接下载 <https://rustwasm.github.io/wasm-pack/installer/>
- 或者npm安装 

``` bash
$ npm i -g wasm-pack
```



### 使用

https://rustwasm.github.io/wasm-pack/book/quickstart.html



## vite 集成

### 自己开发

vite-plugin-wasm-pack: <https://www.npmjs.com/package/vite-plugin-wasm-pack>

在目录中新建项目 

``` bash
$ wasm-pack new <crate-name>

$ wasm-pack build ./<crate-name> --target web
```


``` bash
$ npm i vite-plugin-wasm-pack -D
```

``` ts
import { defineConfig } from 'vite'
import wasmPack from 'vite-plugin-wasm-pack'

export default defineConfig({
  plugins: [wasmPack('./<crate-name>')]
})
```


``` ts
import init, { greet } from '<crate-name>' 

init().then(greet)
```

### 使用 npm package

vite-plugin-wasm: <https://www.npmjs.com/package/vite-plugin-wasm>


``` bash
$ npm i vite-plugin-wasm vite-plugin-top-level-await -D
```


``` ts
import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [wasm(), topLevelAwait()]
})
```


``` ts
const photon = await import('@silvia-odwyer/photon')

let newImage = photon.open_image(canvasRef.value, ctx)

photon.filter(newImage, 'radio')
photon.putImageData(canvasRef.value, ctx, newImage)
```


## Note

WebAssembly 功能之后在 JavaScript / WebAssembly 中更新