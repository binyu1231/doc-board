- Diffuse - 漫反射，材料在光源下缩展示的基本纹理或材质。
- Specular - 镜面反射，材料的高光表现。
- Emissive - 材料的自发光表现。
Ambient - 材料在环境光下的表现。

其中1、2需要设置光源，4- 需要设置环境光。

albedoTexture - 又名漫反射纹理


#### 设置响应灯光数量

``` ts
var material = new BABYLON.StandardMaterial("mat", scene);
material.maxSimultaneousLights = 6;//设置最大响应6个灯光
```
