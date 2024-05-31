---
title: Babylon Material & Texture 材质 & 贴图
date: 2024-05-21
---

## Material

- Diffuse - 漫反射，材料在光源下缩展示的基本纹理或材质。
- Specular - 镜面反射，材料的高光表现。
- Emissive - 材料的自发光表现。
Ambient - 材料在环境光下的表现。

其中1、2需要设置光源，4- 需要设置环境光。

albedoTexture - 又名漫反射纹理


#### 设置材质响应灯光数量

``` ts
const material = new BABYLON.StandardMaterial('mat', scene)
material.maxSimultaneousLights = 6//设置最大响应6个灯光
```

### 材质属性 mesh.material

- `wireFrame`: `{boolean}, default: false` 以骨架方式呈现
- `alpha`: `{0,1}, default: 1` 材质透明度


## Texture



### 四周渐变立方体

<https://www.babylonjs-playground.com/#40UKQ3#2>

感觉光很暗，害得用shader


``` ts
const gradientMaterial = new BABYLON.StandardMaterial('gradientMaterial', scene)

// 设置材质为透明
gradientMaterial.alpha = 1.0
gradientMaterial.backFaceCulling = true

// 创建渐变纹理
const texture = new BABYLON.DynamicTexture('dynamicTexture', {width: 1, height: 2}, scene, false)
const textureContext = texture.getContext()



// 绘制渐变
const gradient = textureContext.createLinearGradient(0, 0, 0, 2)
gradient.addColorStop(0.25, 'rgba(0, 0, 255, 0.4)')
gradient.addColorStop(0.7, 'rgba(0, 0, 255, 0)')

textureContext.fillStyle = gradient
textureContext.fillRect(0, 0, 1, 2)

texture.update()

gradientMaterial.diffuseTexture = texture
gradientMaterial.opacityTexture = texture

gradientMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 1)

// 创建正方体
const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene)

// 将材质应用到正方体
box.material = gradientMaterial

// 设置正方体顶面和底面透明
box.material.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND

const uvCoordinates = [
    // Front face
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    // Back face
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    // Top face
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    // Bottom face
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    // Right face transparent
    0, 0,
    1, 0,
    1, 0,
    0, 0,
    // Left face transparent
    0, 0,
    1, 0,
    1, 0,
    0, 0,
]

box.setVerticesData(BABYLON.VertexBuffer.UVKind, uvCoordinates, true)

const highlightLayer = new BABYLON.HighlightLayer('highlightLayer', scene)
highlightLayer.addMesh(box, new BABYLON.Color3(0.405, 0.764, 0.968)) // 
```