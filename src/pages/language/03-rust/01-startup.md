---
title: startup
---


## 安装 Rust

### 安装 rustup

1. 官网下载 RUSTUP-INIT.exe <https://www.rust-lang.org/zh-CN/tools/install>

2. 安装其他

- Windows 需要C++前置：<https://rust-lang.github.io/rustup/installation/windows-msvc.html>

3. 执行 rustup 设置rust版本

``` bash
$ rustup default stable
```

4. 测试

``` bash
$ rustc --version
# rustc 1.71.0 (8ede3aae2 2023-07-12)
```



## WebAssembly 


### wasm-pack


将rust 项目打包成 WebAssembly 可调用的程序


- 链接下载 <https://rustwasm.github.io/wasm-pack/installer/>
- 或者npm安装 

``` bash
$ npm i -g wasm-pack
```



- JavaScript / WebAssembly