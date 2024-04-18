---
title: Babylon.js startup
---

## 用编辑器创建新项目
 
可以用编辑器创建，编辑器默认使用webpack构建应用。 


## 在web项目中开发
 
``` bash
$ npm create vite@latest babylon-demo -- --template vanilla-ts
# $ pnpm create vite babylon-demo --template vanilla-ts

$ cd babylon-demo
babylon-demo$ npm i @babylonjs/core --save # 7.2.1
``` 


``` ts
// main.ts

import * as Babylon from '@babylonjs/core'

const canvas = document.getElementById('canvas-window') as HTMLCanvasElement

const engine = new Babylon.Engine(canvas, true)

const scene = new Babylon.Scene(engine)

const camera = new Babylon.ArcRotateCamera(
  'camera', // name
  0, // alpha horizontal angle
  0, // beta vertical angle
  10, // radius
  Babylon.Vector3.Zero(), // look at
  scene
)

camera.attachControl(canvas, true)

const sphere = Babylon.MeshBuilder.CreateSphere(
  'sphere', // name
  { diameter: 2 }, // radius
  scene
)

const light = new Babylon.DirectionalLight(
  'light', // name
  new Babylon.Vector3(0, -1, 0), // direction
  scene
)

engine.runRenderLoop(() => {
  scene.render()
})

window.addEventListener('resize', () => {
  engine.resize()
})
```


### Inspector



### Refs

- [doc](https://doc.babylonjs.com/)
- [sandbox](https://sandbox.babylonjs.com/)
- [节点材质编辑器](https://nme.babylonjs.com/)
- [playground](https://playground.babylonjs.com/)
- [editor](https://editor.babylonjs.com/)
- [论坛](https://forum.babylonjs.com/)
- [cyos 着色器编辑器](https://cyos.babylonjs.com/)
- [SpectorJS - webGL 调试工具 chrome 插件](https://chromewebstore.google.com/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk?utm_source=ext_app_menu)