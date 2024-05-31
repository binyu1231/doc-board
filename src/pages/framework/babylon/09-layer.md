---
title: Babylon Layer
date: 2024-05-28
---

### 全局辉光效果

``` ts
const glowLayer = new BABYLON.GlowLayer('glow', scene)
glowLayer.intensity = 0.3
```


### 指定模型辉光

``` ts
const highlightLayer = new BABYLON.HighlightLayer('highlightLayer', scene)

// 只对立方体应用辉光效果
highlightLayer.addMesh(box, BABYLON.Color3.Red());

// 删除辉光效果
highlightLayer.removeMesh(box)
``` 