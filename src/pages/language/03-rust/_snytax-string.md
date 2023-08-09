---
title: string

---

``` rs
let mut s = String::from("Hello");

s.push_str(", World");
s += "!";

// Hello, World!

```


``` rs
let s1 = String::from("hi~");
let s2 = s1.clone();
```


``` rs
let s = String::from("Hello World");
s.clear();
```


### 字符串切片 `&str`

- 字符串切面为不可变引用
- 字符串字面量即为字符串切片
- 字符串字面量也为不可变引用

``` rs
let s = String::from("Hello World");

let hello = &s[0..5]; // &s[..5]
let world = &s[5..11]; // &s[6..] &[6..s.len()]


// 切片复制

let s2 = &s[..] 
// &s[0..s.len()]
// &s[..s.len()]
// &s[0..]
```