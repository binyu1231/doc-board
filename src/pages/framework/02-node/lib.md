---
title: Node 常用库
---

## Zlib

```js
const zlib = require('zlib')

zlib.createGzip() => ???  可传入pipe
```

## Compressing

``` ts
import { zip } from 'compressing'

zip.compressDir(path, to)
```



## Node SSH

``` ts
import { NodeSSH } from 'node-ssh'

(async function () {
  try {
    const ssh = new NodeSSH()

    await ssh.connect({
      host: '10.0.30.48',
      username: 'root',
      privateKeyPath: 'C:/Users/foo/.ssh/id_rsa',
    })
    
    // exec remote command
    await ssh.execCommand('rm -rf ./*.*.zip', { cwd: '/opt/application' })
    
    // upload file
    await return ssh.putDirectory(
      // local path
      path.join(process.env.BUNDLE_DIR as string),
      // remote path
      path.join(process.env.SSH_REMOTE_DIR as string),
      // option
      { recursive: true, concurrency: 10 },
    )
  }
  catch {
    //
  }

  finally {
    process.exit(0)
  }

})()
```