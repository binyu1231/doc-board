---
title: ECMA Features
---


[[toc]]

[ECMA finished proposals](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)

## ES2023

### Array find from last


### Hashbang Grammar


## ES2022

### Class Fields

设置私有属性的方式是在变量前面加一个修饰符 #:

``` ts
class ClassWithPrivateProperty {
  #privateField; // 私有变量
  static #PRIVATE_STATIC_FIELD; // 静态私有变量

  constructor() {
    this.#privateField = 42;
  }

  #privateMethod() { // 私有方法
    return 'hello world';
  }

  static #privateStaticMethod() { // 静态私有方法
    return 'hello world';
  }
}
```

### Ergonomic brand checks for Private Fields

支持了使用 in 去判断私有属性在对象里面存不存在。

``` ts
class C {
  #brand;

  #method() {}

  get #getter() {}

  static isC(obj) {
    return #brand in obj && #method in obj && #getter in obj;
  }
}
```


### Class Static Block

现在，我们可以在类内部开辟一个专门为静态成员初始化的作用域

``` ts
class Translator {
  static translations = {
    yes: 'ja',
    no: 'nein',
    maybe: 'vielleicht',
  };
  static englishWords = [];
  static germanWords = [];
  static _ = initializeTranslator(); // (A)
}
function initializeTranslator() {
  for (const [english, german] of Object.entries(Translator.translations)) {
    Translator.englishWords.push(english);
    Translator.germanWords.push(german);
  }
}

class Translator {
  static translations = {
    yes: 'ja',
    no: 'nein',
    maybe: 'vielleicht',
  };
  static englishWords = [];
  static germanWords = [];
  static { // (A)
    for (const [english, german] of Object.entries(this.translations)) {
      this.englishWords.push(english);
      this.germanWords.push(german);
    }
  }
}

```



### RegExp Match Indices


???


### Top Level `await`

``` ts
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}
```


### Array.prototype.at


``` ts
const a = [1, 2, 3]
a.at(1) // 1
a.at(-1) // 3
```

### Object.hasOwn

``` ts
Object.hasOwn(obj, 'foo')
// 相当于
Object.prototype.hasOwnProperty.call(obj, 'foo')
```

obj 如果是没有原型的对象，直接调用 hasOwnProperty 会报错


---

## ES2021

### String.prototype.replaceAll

``` ts
const queryString = 'q=query+string+parameters'
const withSpaces = queryString.replace(/+/g, ' ')
const withSpaces = queryString.replaceAll('+', ' ')
```

### Promise.any

``` ts
const successPromise = new Promise(resolve => setTimeout(resolve, 3000))
const success2Promise = new Promise(resolve => setTimeout(resolve, 2500))
const errorPromise = new Promise((_, reject) => setTimeout(reject, 1000))

Promise.any([successPromise, success2Promise, errorPromise])
.then((success2PromiseResponse) => {
    // after 2.5s
    console.log(Date.now() - t, success2PromiseResponse)
})

Promise.race([successPromise, success2Promise, errorPromise])
.catch((errorPromiseResponse) => {
    // after 1s
})
```

``` ts
const errorPromise = new Promise((_, reject) => setTimeout(reject, 1000))
const error2Promise = new Promise((_, reject) => setTimeout(reject, 1500))

Promise.any([error2Promise, errorPromise])
.catch(e => {
    // after 1.5
    e // AggregateError: All promises were rejected
})
```

### WeakRefs

WeakRef 对象允许您保留对另一个对象的弱引用，而不会阻止被弱引用对象被 GC 回收

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)

### Logical Assignment Operators

``` ts
x &&= y  // 相当于 x && (x = y)

x ||= y  // 相当于 x || (x = y)

x ??= y  // 相当于 x ?? (x = y)
```

### Numeric separators

数字间可以添加分隔，方便阅读

``` ts
const a = 10_000 // 10000
const b = 1_0000_0000 // 100000000
```

---

## ES2020

### String.prototype.matchAll

返回一个迭代器

``` ts
const str = 'abc_abc_abc'
str.match(/abc/)
// ['abc', index: 0, input: 'abc_abc_abc', groups: undefined]
str.match(/abc/g) 
// ['abc', 'abc', 'abc']

str.matchAll(/abc/)
// ErrorS tring.prototype.matchAll called with a non-global RegExp argument

str.matchAll(/abc/g)
// RegExpStringIterator {}

[...str.matchAll(/abc/g)]
// [
//     ['abc', index: 0, input: 'abc_abc_abc', groups: undefined],
//     ['abc', index: 4, input: 'abc_abc_abc', groups: undefined],
//     ['abc', index: 8, input: 'abc_abc_abc', groups: undefined]
// ] 

```

### 动态 import

``` ts
// foo.js
export function foo {
    return 'foo'
}

import('./foo.js').then(module => {
    module.foo() // 'foo'
})
```

### BigInt

用来表示过大的整数。它不能和普通Number进行混合运算

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

``` ts
big1 = 1n
num1 = 1
big1 === num1 // false
big1 == num1 // true 与普通数字不严格相等

const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER);
const maxPlusOne = previousMaxSafe + 1n;
```

### Promise.allSettled

``` ts
const successPromise = new Promise(resolve => setTimeout(resolve, 3000))
const errorPromise = new Promise((_, reject) => setTimeout(reject, 1000))

Promise.all([successPromise, errorPromise])
.catch(() => {
    // after 1s
})

const errorPromise = new Promise((_, reject) => setTimeout(reject, 1000))
Promise.allSettled([errorPromise, errorPromise])
.then(res => {
    console.log(res)
})

Promise.allSettled([successPromise, errorPromise])
.then((res) => {
    // after 3s
    res
    // [
    //     {status: 'fulfilled', value: undefined}
    //     {status: 'rejected', reason: undefined}
    // ]
})
```

### globalThis

在各种环境中统一全局标量的名称

``` ts
globalThis === window || globalThis === global || globalThis === self
```

### Optional Chaining(?.)

``` ts
const foo = myForm.querySelector('input[name=foo]')?.value
```

### Nullish coalescing Operator(??)

为未定义的值(`null`, `undefined`)设置默认值

``` ts
null ?? 'hi' // 'hi'
undefined ?? 'hi' // 'hi'
0 ?? 'hi' // 0
'' ?? 'hi' // ''
false ?? 'hi' // false
NaN ?? 'hi' // NaN
```

### import.meta

暴露当前JavaScript模块上下文的元数据属性的对象

``` ts
// main.mjs
import './foo.mjs?a=5&b=12'

// foo.mjs
new URL(import.meta.url).searchParams.get('a') // '5'
```

---

## ES2019

### optional `#catch` binding

``` ts
// before
try {

} catch (e) {

}

// now
try {

} catch {

}

```

### Symbol.prototype.description

``` ts
const s = Symbol('foo')
s.description // 'foo'
const s1 = Symbol()
s1.description // undefined
```

### Function.prototype.toString

统一标准，要求返回函数的源代码

``` ts
function foo() {
    console.log('hi')
}

foo.toString() // "function foo() {\n    console.log('hi')\n}"
```

### Object.fromEntries

``` ts
Object.fromEntries([[1, 2], [3, 4]]) // {1: 2, 3: 4}
Object.entries({1: 2, 3: 4}) // [['1', 2], ['3', 4]]
```

### Array.prototype.flat

``` ts
[1, [2, [3, [4, 5]]]].flat() // [1, 2, [3, [4, 5]]]
[1, [2, [3, [4, 5]]]].flat(2) // [1, 2, 3, [4, 5]]
[1, [2, [3, [4, 5]]]].flat(Infinity) // [1, 2, 3, 4, 5]
```

### Array.prototype.flatMap

``` ts
[1, 2, 3, 4].flatMap(x => [x * 2]) // [2, 4, 6, 8]
// 相当于
[1, 2, 3, 4].map(x => [x * 2]).flat() // [2, 4, 6, 8]
```

### String.prototype.trimStart & String.prototype.trimEnd

``` ts
const str = '    Hello World    '
str.trimStart() // "Hello World    "
str.trimEnd() // "    Hello World"
```

--- 

## ES2018

### await 循环

``` ts
async function process(array) {
    for await (let i of array) {
        doSimething(i)
    }
}
```

### Promise.finally

``` ts
Promise.resolve()
.then(() => {

})
.finally(() => {

})
```

### Object Rest/Spread

为对象拓展了 `...` 功能

``` ts
const { a, ...rest } = { a: 1, b: 2, c: 3 }
a // 1
rest // { b: 2, c: 3 }

function foo(obj) {
    return obj
}

foo({ a: 1, ...rest }) // {a: 1, b: 2, c: 3 }
```

### 正则命名捕获

``` ts
const regDate = /(?<year>\d+)-(?<month>\d+)-(?<date>\d+)/
const match = regDate.exec('2018-04-30')
const { year, month, date } = match.groups


const regDate = /(\d+)-(\d+)-(\d+)/
const match = regDate.exec('2018-04-30')
const [ _, year, month, date ] = match
```

### 正则反向断言

``` ts
// 先行断言(lookahead)
const reLookahead = /\D(?=[0-9\.]+)/
const match = reLookahead.exec('$123.89')
match[0] // '$'

// 反向断言(lookbehind) 
// 肯定形式(?<=)
const reLookbehind = /(?<=\D)[0-9\.]+/
const match = reLookbehind.exec('$123.89')
match[0] // 123.89
// 否定形式(?<!)
const reLookbehind = /(?<!\D)[0-9\.]+/
const match = reLookbehind.exec('$123.89')
match[0] // 23.89
```

### 正则 dotAll

flag `s` 允许字符串中包换换行符 

``` ts
/hello.world/.test('hello\nworld') // false
/hello.world/s.test('hello\nworld') // true
```


### 非转义序列的模板字符串

????

``` ts
String.raw``
```

---

## ES2017

### Object.values/Object.entries

### String padding

### Object.getOwnPropertyDescriptors

### Trailing commas in function parameter lists and calls

### Async functions

### Shared memory and atomics

--- 

## ES2016

### Array.prototype.includes


### Exponentiation operator