---
title: vector

---

### 声明

```rs
let v: Vec<i32> = Vec::new();
let mut mutV: vec![1, 2, 3];



// 存储不同类型(可穷尽类型)
enum SpreadsheetCell {
  Int(i32), Float(f64), Text(String),
}

let row = vec![
  SpreadsheetCell::Int(3),
  SpreadsheetCell::Float(3.5),
  SpreadsheetCell::Text("3.5"),
]

```


### 访问 


``` rs
let third: &i32 = &v[2]; // panic!

match v.get(2) {
  Some(third) => third,
  None => println!("There is no third value"),
}

```


### 修改


``` rs
for i in &mut mutV {
  *i *= 50
  println!("{}", i);
}
```

