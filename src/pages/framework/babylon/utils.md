---
title: Babylon.js Utils
---

### 坐标轴

```ts
//Local Axes
function localAxes(size) {
  var pilot_local_axisX = BABYLON.Mesh.CreateLines(
    "pilot_local_axisX",
    [
      new BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, -0.05 * size, 0),
    ],
    scene
  );
  pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);

  pilot_local_axisY = BABYLON.Mesh.CreateLines(
    "pilot_local_axisY",
    [
      new BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(0.05 * size, size * 0.95, 0),
    ],
    scene
  );
  pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);

  var pilot_local_axisZ = BABYLON.Mesh.CreateLines(
    "pilot_local_axisZ",
    [
      new BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
    ],
    scene
  );
  pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);

  var local_origin = BABYLON.MeshBuilder.CreateBox(
    "local_origin",
    { size: 1 },
    scene
  );
  local_origin.isVisible = false;

  pilot_local_axisX.parent = local_origin;
  pilot_local_axisY.parent = local_origin;
  pilot_local_axisZ.parent = local_origin;

  return local_origin;
}
```

### 复制mesh

``` ts
localOrigin.parent = pilot;
pilot1 = pilot.clone("pilot1");
pilot2 = pilot.clone("pilot2");

```

### 创建3D文字


创建3D文字时,需要添加额外的库

``` bash
$ npm i earcut -S 
$ npm i @types/earcut -D
```

``` ts
import earcut from 'earcut'
window.earcut = earcut
```