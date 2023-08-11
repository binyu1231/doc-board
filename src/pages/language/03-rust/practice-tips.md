---
title: tips
index: Language.Rust.Practice
---

## 类型转换

### 字符串转数字

``` rs
let mut guess = String::new();

io::stdin().read_line(&mut guess).expect("Cannot read.");

let guess: u32 = guess.trim().parse().expect("Not a number");
```