
## windows terminal 运行 linux 命令


### 1. 安装 git bash 

> 提供 linux 命令, 也可以自己安装 `mingw64`

- <https://gitforwindows.org/> 下载软件，安装过程中有一步需要手动勾选 `添加到windows terminal`. 如果没勾选之后也可以手动加。


### 2. 安装 windows terminal

> 美化通过 oh-my-posh 实现，集成 git bash 到Windows terminal 为了更好控制各种样式

**一般windows11都会自带** windows terminal. 如果没有去 `Microsoft Store` 搜索下载(`win`键，输入即可打开软件)

### 3. 安装 oh my posh 

- 打开 windows terminal（`win`键，输入 `terminal` 或者 `终端`）
- 输入 `$ winget install JanDeDobbeleer.OhMyPosh`

### 4. 在windows系统中安装兼容字体


- <https://www.nerdfonts.com/font-downloads> 找一个喜欢的字体下载
- 打开字体设置(`win`键，输入`字体设置`), 点击浏览并安装字体，按住shift添加所有同名字体。安装完后在下方字体列表中找到字体的名字(字体数量上面的一排小字，我用的是 `SauceCodePro Nerd Font`)



### 4. 配置 windows terminal

- `windows terminal` 上方标题栏向下箭头打开 `设置` - 左下方 `打开 JSON 文件`

- `在 profiles`下方添加

  ``` js
  {
    "profiles": {
      "deafults": { // 适用于下方list中的所有终端
        "font": 
        {
            "face": "SauceCodePro Nerd Font" // 刚才安装的字体名字
        },
        "opacity": 80, // 背景透明度
        "useAcrylic": true // 背景模糊
        "startingDirectory": "C:/Users/code/", // 终端启动位置
      }, 
      "list": [
        { // 自带 powershell
          "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
          "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
          "hidden": false,
          "name": "Windows PowerShell"
        },
        { // 自带 cmd
          "commandline": "%SystemRoot%\\System32\\cmd.exe",
          "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
          "hidden": false,
          "name": "\u547d\u4ee4\u63d0\u793a\u7b26"
        },
        { // 安装完 git bash 自动添加的，如果没有选择添加到 terminal, 则需要手动添加下面一行，代替 guid
          // "commandline": C:/Users/software/tool/Git/bin/bash.exe",
          "guid": "{2ece5bfe-50ed-5f3a-ab87-5cd4baafed2b}",
          "hidden": false,
          "name": "Git Bash",
          "source": "Git"
        }
      ]
    }
  }
  ```

- 将 windows terminal 默认启动改为 git bash. `设置` - `启动` - `默认配置文件` 下拉选择 git bash


这样关闭terminal 再重新启动就成功了。




### 配置 git bash 字体

安装完 `oh-my-posh` 后 git bash 样式也会被修改，出现的文字乱码需要设置一下字体

右击`标签栏` - 点击 `options` - 点击 `Text` 选项 - 选择 `Font` 下的 `Select ...` 按钮选择字体. 选择之前下载安装的字体（我用的是 `SauceCodePro Nerd Font`）


### 配置 vscode 终端

打开 VSCode, `ctrl` + `~` 打开终端窗口， 右上角下拉框中选择，`select default profile`。选择 `git bash`. 打开用户设置,搜索 `Terminal › Integrated: Font Family` 填写之前安装的字体名



### refs

- https://www.bilibili.com/video/BV1Qa411T7Au/?spm_id_from=333.880.my_history.page.click&vd_source=9d9240f26d3b2cc94a997061dd650e18
- https://blog.csdn.net/qq_33154343/article/details/120661945
