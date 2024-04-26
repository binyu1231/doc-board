---
title: Babylon Camera
---





### 相机行走控制

```ts
const walkCamera = new UniversalCamera(
  'walk-camera', 
  new Vector3(0, 5, -10), 
  scene
)

walkCamera.setTarget(Vector3.Zero())
walkCamera.attachControl(canvas, true)

camera.keysUp.push(87)              // W
camera.keysDown.push(83)            // S
camera.keysLeft = [65]              // A, remove ArrowLeft 37
camera.keysRight = [68]             // D, remove ArrowRight 39
console.log(camera.keysRight)
camera.keysRotateLeft.push(81, 37)  // Q, ArrowLeft
camera.keysRotateRight.push(69, 39) // E, ArrowRight
camera.keysRotateUp.push(84)        // T 上仰
camera.keysRotateDown.push(86)      // V 下俯
camera.keysUpward.push(82)          // R 正交于视窗向上平移
camera.keysDownward.push(67)        // C 正交于视窗向下平移

```

- [MDN KeyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#value_of_keycode)


### 自定义相机控制


ref: <https://playground.babylonjs.com/#CTCSWQ#945>



