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