---
title: threejs
---

## startup

### 安装依赖 

``` bash
$ npm i three
$ npm i @types/three -D
```

### 初始化场景

``` ts
import { AxesHelper } from 'three'

const renderer = MainRenderer.instance
const camera = MainCamera.instance
const scene = MainScene.instance

const axes = new AxesHelper(20)
scene.add(axes)

camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

renderer.render(scene, camera)
```

``` ts
export class Util {
    static fullWidth = globalThis.innerWidth
    static fullHeight = globalThis.innerHeight
    static screenRatio = Util.fullWidth / Util.fullHeight
}
```

```ts
import { Scene } from 'three'

export class MainScene extends Scene {
    private static ins: MainScene
    static get instance () {
        return MainScene.ins || (MainScene.ins = new MainScene())
    }

    private constructor() {
        super()
    }
}
```

``` ts
import { PerspectiveCamera } from 'three'

export class MainCamera extends PerspectiveCamera {
    private static ins: MainCamera
    static get instance () {
        return MainCamera.ins || (MainCamera.ins = new MainCamera())
    }

    private constructor() {
        super(45, Util.screenRatio, 0.1, 1000)
    }
}
```


``` ts
import { WebGLRenderer } from 'three'

export class MainRenderer extends WebGLRenderer {
    private static ins: MainRenderer
    static get instance () {
        return MainRenderer.ins || (MainRenderer.ins = new MainRenderer())
    }

    private constructor() {
        super()
        this.setClearColor(0x000000)
        this.setSize(Util.fullWidth, Util.fullHeight)
    }
    
    mount() {
        document.body.appendChild(this.domElement)   
    }
}
```

