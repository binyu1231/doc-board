---
title: Babylon Animation

---


### 路线位移动画

``` ts
const roadLine = [
  new Vector3(-322, 20, -596),
  new Vector3(-320, 21, -548),
  new Vector3(-304, 23, -481),
  new Vector3(-240, 21, -350),
  new Vector3(-124, 15, -132),
  new Vector3(-118, 16, -87),
  new Vector3(-121, 16, -66),
  new Vector3(-137, 17, -22),
  new Vector3(-150, 18, 1),
  new Vector3(-191, 5, 58)
]


const frameRate = 20

const moveAni = new Animation(
  'car-roadline', 
  'position', 
  frameRate, 
  Animation.ANIMATIONTYPE_VECTOR3,
  Animation.ANIMATIONLOOPMODE_CONSTANT,
)

moveAni.setKeys(roadLine.map((p, i) => ({ frame: (i + 1) * frameRate, value: p })))

carMesh.animations.push(moveAni)

// console.log(carMesh.animations)

scene.beginAnimation(carMesh, 0, 10 * frameRate, true);

```