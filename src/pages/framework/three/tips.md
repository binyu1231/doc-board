---
title: tips

---

## 自适应屏幕

``` ts
globalThis.addEventListener('resize', function () {
    camera.aspect = globalThis.innerWidth / globalThis.innerHeight
    camera.updateProjectionMatrix() // 防止窗口改变时，图像拉伸

    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight)
})
```

## 背景透明

``` ts
rendererInstance.setColorAlpha(0)
```

## 覆盖场景的所有对象的材质

```ts
scene.overrideMaterial = new MeshLambertMaterial({ color: 0xff0000 }) 
```

## 场景添加雾化效果

``` ts
scene.fog = new FogExp2(0xffffff, 0.01)
```

## 加载模型(gltf)


**Note:**

- 加载资源需要服务器环境
- gltf模型是自带场景的，其内部的材质资源引用路径都是相对路径。

``` ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()

loader.loadAsync('your/model/path.gltf')
.then((model) => {
    modelScene = model.scene
    modelScene.position.set(0, 0, 0)
    // 根据不同的模型进行调整
    modelScene.scale.set(10, 10, 10)
    
    scene.add(modelScene)
})
.then(() => {
    // 添加灯光才能看到模型
    scene.add(new AmbientLight(0xffffff))
    
    renderer.render(scene, camera)
})
```