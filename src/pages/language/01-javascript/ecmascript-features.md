---
title: ECMAScript Features
---


[[toc]]

[ECMA finished proposals](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)

## ES2023 ✅

###  Array find from last 

- `Array.prototype.findLast`
- `Array.prototype.findLastIndex`

``` ts
const foo = [{ value: 1 }, { value: 2 }, { value: 3}, { value: 2 }]

foo.findIndex((item) => item.value === 2) // 1
foo.findLastIndex((item) => item.value === 2) // 3

```


### Hashbang Grammar

支持命令行文件 SheBang/Hashbang 语法

``` ts
#!/usr/bin/env node
// in the Script Goal
'use strict';
console.log(1);
```

``` ts
#!/usr/bin/env node
// in the Module Goal
export {};
console.log(1);
```


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

## ES2019 ✅

### Optional `catch` binding

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

### JSON superset

之前如果JSON字符串中包含有行分隔符(\u2028) 和段落分隔符(\u2029)，那么在解析过程中会报错。

``` ts
// before
JSON.parse('"\u2028"');  // SyntaxError

// now
JSON.parse('"\u2028"');  // ''
``` 

### Symbol.prototype.description

`symbol` 类型增加 `description` 属性

``` ts
const s = Symbol('foo')
s.description // 'foo'
const s1 = Symbol()
s1.description // undefined
```

### Function.prototype.toString revision

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

### Well-formed JSON.stringify

防止JSON.stringify返回格式错误的Unicode字符串, 保证多个 unicode 组合能够正确转义

``` ts
// before
JSON.stringify('\uD83D');  // '"�"'


// Non-BMP characters still serialize to surrogate pairs.
JSON.stringify('𝌆')
// → '"𝌆"'
JSON.stringify('\uD834\uDF06')
// → '"𝌆"'

// Unpaired surrogate code units will serialize to escape sequences.
JSON.stringify('\uDF06\uD834')
// → '"\\udf06\\ud834"'
JSON.stringify('\uDEAD')
// → '"\\udead"'
``` 

### String.prototype.{trimStart,trimEnd}

``` ts
const str = '    Hello World    '
str.trimStart() // "Hello World    "
str.trimEnd() // "    Hello World"
```

### Array.prototype.{flat, flatMap}

``` ts
[1, [2, [3, [4, 5]]]].flat() // [1, 2, [3, [4, 5]]]
[1, [2, [3, [4, 5]]]].flat(2) // [1, 2, 3, [4, 5]]
[1, [2, [3, [4, 5]]]].flat(Infinity) // [1, 2, 3, 4, 5]
```

``` ts
[1, 2, 3, 4].flatMap(x => [x * 2]) // [2, 4, 6, 8]
// 相当于
[1, 2, 3, 4].map(x => [x * 2]).flat() // [2, 4, 6, 8]
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

## ES2017 ✅

### Object.values/Object.entries

- `Object.values(o: any) => any[]`
- `Object.entries(o: any) => any[][]`

``` ts
const foo = { x: 5, y: 12 }

Object.keys(foo) // ['x', 'y']

Object.values(foo) // [5, 12]
Object.entries(foo) // [['x', 5], ['y', 12]]
```

### String padding

- `String.prototype.padStart(maxLength: number, fillString?: string) => string`
- `String.prototype.padEnd(maxLength: number, fillString?: string) => string`

``` ts
'foo'.padStart(4) // ' foo'
'foo'.padStart(7, 'hello ') // 'hellfoo'

'foo'.padEnd(4) // 'foo '
'foo'.padEnd(4, '12') // 'foo1'
```

### Object.getOwnPropertyDescriptors

- `Object.getOwnPropertyDescriptors(obj: any, prop: string) => Descriptor`

``` ts
const foo = { x: 5, y: 12 }
Object.getOwnPropertyDescriptors(foo, 'x')
// {value: 5, writable: true, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptors(foo, 'z')
// undefined
```


### Trailing commas in function parameter lists and calls

函数的参数支持尾逗号, 不会影响 `function.length`

``` ts
function clownPuppiesEverywhere(
  param1,
  param2, // Next parameter that's added only has to add a new line, not modify this line
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar', // Next parameter that's added only has to add a new line, not modify this line
);
```

### Async functions

语言层面实现 `async` 与 `await`

``` ts
function foo() {
  return Promise.resolve('bar')
}

(async function loaded() {
  try {
    await foo() // 'bar'
  }
  catch (e) {
    
  }
})()
```

### Shared memory and atomics

SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象。对象，但它们可以用来在共享内存上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。

一个新的低级别Atomics命名空间对象和一个SharedArrayBuffer构造函数，来作为更高级别并发抽象的原始构建块。共享多个service worker和核心线程之间的SharedArrayBuffer对象的数据。在worker之间共享数据，改善worker之间的协调。

``` ts
new SharedArrayBuffer(length)
```

- [MDN Atomics](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics)


--- 

## ES2016 ✅

### TypedArray.prototype.includes

`T[].includes(searchElement: T, fromIndex?: number) => boolean`

``` ts
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false

[1, 2, NaN].includes(NaN) // true
'abc'.includes('b') // true
'abc'.includes('b', 2) // false
```


### Exponentiation operator

乘方操作符

``` ts
// x ** y

let squared = 2 ** 2 // same as: 2 * 2

let cubed = 2 ** 3 // same as: 2 * 2 * 2


// x **= y

let a = 2
a **= 2 // same as: a = a * a;

let b = 3
b **= 3 // same as: b = b * b * b;
```