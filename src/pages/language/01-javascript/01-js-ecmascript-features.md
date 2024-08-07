---
title: ECMAScript Features
index: Language.JavaScript.Snytax
---


[[toc]]

[ECMA finished proposals](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md)

## ES2025 ✅

<ToggleContent title="正则表达式中可以使用重复的组名">

``` ts
let str1 = '04-2099'
let str2 = '2024-04'

const reg = /(?<year>[0-9]{4})-[0-9]{2}|[0-9]{2}-(?<year>[0-9]{4})/

/// before
/// 因为使用了重复的组名 <year> 导致报错
str1.match(reg) // Error 
str2.match(reg) // Error

/// now 
str1.match(reg).groups.year // 2099
str2.match(reg).groups.year // 2024
```

</ToggleContent>
<ToggleContent title="Set 新增逻辑运算方法">

- 交集: `Set.prototype.intersection(Set) -> Set`
- 并集: `Set.prototype.union(Set) -> Set`
- 差集/补集: `Set.prototype.difference(Set) -> Set`
- 对称差: `Set.prototype.symmetricDifference(Set) -> Set`
- 子集: `Set.prototype.isSubsetOf(Set) -> boolean`
- 超集: `Set.prototype.isSupersetOf(Set) -> boolean`
- 互斥: `Set.prototype.isDisjointFrom(Set) -> boolean`

``` ts
const a = new Set([1, 2, 3])
const b = new Set([4, 3, 2])

// 交集 a * b
b.intersection(a) // b ∩ a => Set{3, 2} 
a.intersection(b) // a ∩ b => Set{2, 3}

// 并集 a + b
a.union(b)        // a ∪ b => Set{1, 2, 3, 4}
b.union(a)        // b ∪ a => Set{4, 3, 2, 1}

// 差集：a - b
a.difference(b)   // a ∖ b => Set{1}
b.difference(a)   // b ∖ a => Set{4}

// 对称差：两个集合中不重复的元素
a.symmetricDifference(b) // a Δ b => Set{1, 4}
b.symmetricDifference(a) // b Δ a => Set{4, 1}

// 是子集
a.isSubsetOf(b) // false
b.isSubsetOf(a) // false

const c = new Set([3, 2])

c.isSubsetOf(a) // true
c.isSubsetOf(b) // true


// 是超集
a.isSupersetOf(c) // true
b.isSupersetOf(a) // false

// 互斥，两个集合没有共同元素
a.isDisjointFrom(b) // false
c.isDisjointFrom(a) // false

const d = new Set([1, 4])
d.isDisjointFrom(c) // true
```



</ToggleContent>


## ES2024


<ToggleContent title="Well-Formed Unicode Strings">



</ToggleContent>

<ToggleContent title="`Atomics.waitAsync`">



</ToggleContent>

<ToggleContent title="RegExp v flag with set notation + properties of strings">



</ToggleContent>

<ToggleContent title="Resizable and growable ArrayBuffers">



</ToggleContent>

<ToggleContent title="Array Grouping">



</ToggleContent>
<ToggleContent title="Promise.withResolvers">

该方法提供一个实例化 `Promise` 之后配置 `resolve` 与 `reject` 行为. 意味着可以少写一层嵌套, 或者设置中间变量.

``` ts
// before
function request () {
  return new Promise((resolve, reject) => {
    asyncRequest(config, response => {
      const buffer = []
      response.on('data', data => buffer.push(data))
      response.on('end', () => resolve(buffer))
      response.on('error', reason => reject(reason))
    })
  })
}

// now
function request() {
  const { resolve, reject, promise } = Promise.withResolvers()

  asyncRequest(config, response => {
    const buffer = []
    response.on('data', data => buffer.push(data))
    response.on('end', () => resolve(buffer))
    response.on('error', reason => reject(reason))
  })

  return promise
}
```



``` ts
class Promise {
  static withResolvers() {
    let resolve
    let reject
    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    }) 

    return { resolve, reject, promise }
  }
}
```

</ToggleContent>
<ToggleContent title="ArrayBuffer transfer">



</ToggleContent>



## ES2023 ✅

<ToggleContent title="Change Array by Copy">

为数组新增额外的方法，返回数组的新的复制。不会修改原来的数组

数组新增方法

- `Array.prototype.toReversed() -> Array`
- `Array.prototype.toSorted(compareFn) -> Array`
- `Array.prototype.toSpliced(start, deleteCount, ...items) -> Array`
- `Array.prototype.with(index, value) -> Array`

类型数组新增方法

- `TypedArray.prototype.toReversed() -> TypedArray`
- `TypedArray.prototype.toSorted(compareFn) -> TypedArray`
- `TypedArray.prototype.with(index, value) -> TypedArray`

</ToggleContent>

<ToggleContent title="Symbols as WeakMap keys">

symbols 类型可以作为 WeakMap 的键

``` ts
const weak = new WeakMap();

// Pun not intended: being a symbol makes it become a more symbolic key
const key = Symbol('my ref');
const someObject = { /* data data data */ };

weak.set(key, someObject);
```

</ToggleContent>

<ToggleContent title="Array find from last">

数组添加了两个从尾部索引的方法

- `Array.prototype.findLast`
- `Array.prototype.findLastIndex`

``` ts
const foo = [{ value: 1 }, { value: 2 }, { value: 3}, { value: 2 }]

foo.findIndex((item) => item.value === 2) // 1
foo.findLastIndex((item) => item.value === 2) // 3

```

</ToggleContent>


<ToggleContent title="Hashbang Grammar">


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

</ToggleContent>

---

## ES2022 ✅


<ToggleContent title="Class Fields">

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

</ToggleContent>


<ToggleContent title="RegExp Match Indices">

正则表达式新增 `d` flag, 同时增加了 `hasIndices` 属性来判断是否使用了 `d` flag

- `d` 标志表示正则表达式匹配的结果应该包含每个捕获组子字符串开始和结束的索引。
- 它不会以任何方式改变正则表达式的解释或匹配行为，它只在匹配的结果中提供额外的信息。
- `RegExp.prototype.hasIndices() => boolean`


- [RegExp.prototype.hasIndices](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices)


``` ts
const str1 = 'foo bar foo'

const regex1 = /foo/gd


regex1.hasIndices // true
regex1.exec(str1).indices // [0, 3]
regex1.exec(str1).indices // [8, 11]
regex1.exec(str1).indices // Error

[...str1.matchAll(regex1)]
// [
//   ['foo', index: 0, input: 'foo bar foo', indices: [0, 3]]
//   ['foo', index: 8, input: 'foo bar foo', indices: [8, 11]]
// ]

const regex2 = /foo/
regex2.hasIndices // false
regex2.exec(str1).indices // undefined
```

</ToggleContent>


<ToggleContent title="Top Level `await`">

支持在顶层(没有前置 `async`)使用 `await`

``` ts
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}
```

</ToggleContent>

<ToggleContent title="Ergonomic brand checks for Private Fields">


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

</ToggleContent>


<ToggleContent title="Array.prototype.at">

为数组添加用索引读取元素的方法，支持负数索引

- `Array<T>.prototype.at(index: number) => T`

``` ts
const a = [1, 2, 3]
a.at(1) // 1
a.at(-1) // 3
```

</ToggleContent>


<ToggleContent title="Accessible Object.prototype.hasOwnProperty">


Object 新增静态方法来简化 `hasOwnProperty` 的使用

``` ts
Object.hasOwn(obj, 'foo')
// 相当于
Object.prototype.hasOwnProperty.call(obj, 'foo')
```

obj 如果是没有原型的对象，直接调用 hasOwnProperty 会报错

</ToggleContent>


<ToggleContent title="Class Static Block">


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

</ToggleContent>

<ToggleContent title="Error Cause">

  Error 类第二个参数，新增一个 `cause` 字段用来传入自定义信息。

  ``` ts
  try {
    throw new RangeError('error-message', { cause: { foo: 'bar' } })
  }
  catch(e) {
    console.log(e.cause) // {foo: 'bar'} 
    console.log(e.message) // 'error-message' 
    console.log(e.name) // 'RangeError'
  }
  ```

</ToggleContent>

---

## ES2021 ✅

<ToggleContent title="String.prototype.replaceAll">

为字符串添加一个可以全局替换特定字符串的方法

- `String.prototype.replaceAll(searchValue: string, replaceValue: string) => string`
- `String.prototype.replaceAll(searchValue: string, replacer: Replacer) => string`
  - `Replacer: (s: string, i: number, raw: string) => string`

``` ts
const queryString = 'q=query+string+parameters'
const withSpaces = queryString.replace(/+/g, ' ')
const withSpaces = queryString.replaceAll('+', ' ')

'vbcv'.replaceAll('v', (s, i, raw) => {
  // 'v', 0, vbcv
  // 'v', 3, vbcv
  return 'a'
})
// 'abca'
```

</ToggleContent>

<ToggleContent title="Promise.any">


为 Promise 增加了在任意一个 promise 达到 `fulfilled` 之后触发的静态函数

- `Promise.any(promises: Promise[]) => Promise`

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

</ToggleContent>



<ToggleContent title="WeakRefs">


WeakRef 对象允许您保留对另一个对象的弱引用，而不会阻止被弱引用对象被 GC 回收

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)

</ToggleContent>

<ToggleContent title="Logical Assignment Operators">


为逻辑语句添加简写语法

``` ts
x &&= y  // 相当于 x && (x = y)

x ||= y  // 相当于 x || (x = y)

x ??= y  // 相当于 x ?? (x = y)
```

</ToggleContent>

<ToggleContent title="Numeric separators">

数字间可以添加分隔，方便阅读

``` ts
const a = 10_000 // 10000
const b = 1_0000_0000 // 100000000
```

</ToggleContent>

---

## ES2020 ✅


<ToggleContent title="String.prototype.matchAll">

为字符串类型添加一个根据正则表达式返回全部匹配信息的方法

- `String.prototype.matchAll(regexp: RegExp) => Iterator`

返回一个迭代器

``` ts
const str = 'abc_abc_abc'
str.match(/abc/)
// ['abc', index: 0, input: 'abc_abc_abc', groups: undefined]
str.match(/abc/g) 
// ['abc', 'abc', 'abc']

str.matchAll(/abc/)
// Error String.prototype.matchAll called with a non-global RegExp argument

str.matchAll(/abc/g)
// RegExpStringIterator {}

[...str.matchAll(/abc/g)]
// [
//     ['abc', index: 0, input: 'abc_abc_abc', groups: undefined],
//     ['abc', index: 4, input: 'abc_abc_abc', groups: undefined],
//     ['abc', index: 8, input: 'abc_abc_abc', groups: undefined]
// ] 

```

</ToggleContent>


<ToggleContent title="import()">


添加全局函数 `import`, 用来动态引入 JavaScript

``` ts
// foo.js
export function foo {
    return 'foo'
}

import('./foo.js').then(module => {
    module.foo() // 'foo'
})
```

</ToggleContent>



<ToggleContent title="BigInt">


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

</ToggleContent>


<ToggleContent title="Promise.allSettled">

为 Promise 添加一个在所有promise都处理完后触发的函数 

`Promise.allSettled<T>(promises: Promise<T>[]) => Promise<T[]>`

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

</ToggleContent>



<ToggleContent title="globalThis">


在各种环境中统一全局标量的名称

``` ts
globalThis === window || globalThis === global || globalThis === self
```

</ToggleContent>


<ToggleContent title="for-in mechanics">


统一 for-in 枚举顺序

</ToggleContent>


<ToggleContent title="Optional Chaining(?.)">


添加可选的链式语法调用。是一种短路语法

``` ts
const foo = myForm.querySelector('input[name=foo]')?.value
```

</ToggleContent>


<ToggleContent title="Nullish coalescing Operator(??)">


为未定义的值(`null`, `undefined`)设置默认值

``` ts
null ?? 'hi' // 'hi'
undefined ?? 'hi' // 'hi'
0 ?? 'hi' // 0
'' ?? 'hi' // ''
false ?? 'hi' // false
NaN ?? 'hi' // NaN
```

</ToggleContent>


<ToggleContent title="import.meta">


暴露当前JavaScript模块上下文的元数据属性的对象

``` ts
// main.mjs
import './foo.mjs?a=5&b=12'

// foo.mjs
new URL(import.meta.url).searchParams.get('a') // '5'
```

</ToggleContent>


---

## ES2019 ✅

<ToggleContent title="Optional `catch` binding">

可选择是否使用 catch 的参数

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

</ToggleContent>


<ToggleContent title="JSON superset">

将JavaScript 的语法拓展为 JSON 的超集

之前如果JSON字符串中包含有行分隔符(\u2028) 和段落分隔符(\u2029)，那么在解析过程中会报错。

``` ts
// before
JSON.parse('"\u2028"');  // SyntaxError

// now
JSON.parse('"\u2028"');  // ''
``` 

</ToggleContent>

<ToggleContent title="Symbol.prototype.description">

`symbol` 类型增加 `description` 属性

``` ts
const s = Symbol('foo')
s.description // 'foo'
const s1 = Symbol()
s1.description // undefined
```

</ToggleContent>

</ToggleContent> 

<ToggleContent title="Function.prototype.toString revision">

统一标准，要求返回函数的源代码

``` ts
function foo() {
    console.log('hi')
}

foo.toString() // "function foo() {\n    console.log('hi')\n}"
```

</ToggleContent> 

<ToggleContent title="Object.fromEntries">

`Object` 新增一个静态方法

- `Object.fromEntries(entries: any[][]) => any` 通过键值对数组创建对象

``` ts
Object.fromEntries([[1, 2], [3, 4]]) // {1: 2, 3: 4}
Object.entries({1: 2, 3: 4}) // [['1', 2], ['3', 4]]
```


</ToggleContent> 

<ToggleContent title="Well-formed JSON.stringify">

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


</ToggleContent> 

<ToggleContent title="String.prototype.{trimStart,trimEnd}">

字符串类型增加了两个用于删除字符串前后的空格。匹配 `padStart`, `padEnd` 的名字。功能与 `trimLeft`, `trimRight` 相同

- `String.prototype.trimStart() => string`
- `String.prototype.trimEnd() => string`

``` ts
const str = '    Hello World    '
str.trimStart() // "Hello World    "
str.trimEnd() // "    Hello World"
```


</ToggleContent> 

<ToggleContent title="Array.prototype.{flat, flatMap}">

数组类型新增两个用于展平数组的方法

- `Array<T>.prototype.flat(depth?: number) => T[]`
- `Array<T>.prototype.flatMap<K>(callback: (o: T, i: number) => K , thisArg?: This) => T[]`

``` ts
[1, [2, [3, [4, 5]]]].flat() // [1, 2, [3, [4, 5]]]
[1, [2, [3, [4, 5]]]].flat(2) // [1, 2, 3, [4, 5]]
[1, [2, [3, [4, 5]]]].flat(Infinity) // [1, 2, 3, 4, 5]
```

``` ts
// flatMap 效率更高
[1, 2, 3, 4].flatMap(x => [x * 2]) // [2, 4, 6, 8]
// 相当于
[1, 2, 3, 4].map(x => [x * 2]).flat() // [2, 4, 6, 8]
```

</ToggleContent> 


--- 

## ES2018 ✅


<ToggleContent title="Lifting template literal restriction">

增强字符串的能力，提供了标签函数

- [带标签的模板字符串 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals#%E5%B8%A6%E6%A0%87%E7%AD%BE%E7%9A%84%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

``` ts

function myTag(strings, personExp, ageExp) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "
  let str2 = strings[2]; // "."

  let ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

myTag`That ${ 'Mike' } is a ${ 28 }.`;

// 'That Mike is a youngster.'
```

</ToggleContent> 

<ToggleContent title="`s` (dotAll) flag for regular expressions">

正则新增flag `s` 允许 `.` 匹配字符串中的换行符 

``` ts
/hello.world/.test('hello\nworld') // false
/hello.world/s.test('hello\nworld') // true
```

</ToggleContent> 

<ToggleContent title="RegExp named capture groups">

正则增加命名捕获，捕获的组将会放入 `groups` 的对应字段中

``` ts
const regDate = /(?<year>\d+)-(?<month>\d+)-(?<date>\d+)/
const match = regDate.exec('2018-04-30')
const { year, month, date } = match.groups


const regDate = /(\d+)-(\d+)-(\d+)/
const match = regDate.exec('2018-04-30')
const [ _, year, month, date ] = match
```

</ToggleContent> 

<ToggleContent title="Rest/Spread Properties ">

为对象增加了 `...` 拓展功能

``` ts
const { a, ...rest } = { a: 1, b: 2, c: 3 }
a // 1
rest // { b: 2, c: 3 }

function foo(obj) {
    return obj
}

foo({ a: 1, ...rest }) // {a: 1, b: 2, c: 3 }
```







</ToggleContent> 

<ToggleContent title="RegExp Lookbehind Assertions">

为正则增加反向断言功能

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

</ToggleContent> 

<ToggleContent title="RegExp Unicode Property Escapes">

正则表达式 支持根据 Unicode 属性进行匹配

- [Unicode property escapes MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)

`\p{UnicodePropertyName=UnicodePropertyValue}`

``` ts
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π');
// → true

const sentence = 'A ticket to 大阪 costs ¥2000 👌.';
sentence.match(/\p{Emoji_Presentation}/gu)
// ['👌']
```

</ToggleContent> 

<ToggleContent title="Promise.prototype.finally">

为 `Promise` 类型增加 `finally` 方法。它将在 fulfilled 或 rejected 执行

``` ts
let loading = false

loading = true
fooPromise()
.then((response) => {
  // handle response
})
.catch((error) => {
  // handle error
})
.finally(() => {
  loading = false
})
```

</ToggleContent> 

<ToggleContent title="Asynchronous Iteration">

await 循环

- [`for await ... of` MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for-await...of)

``` ts
async function process(array) {
    for await (let i of array) {
        doSimething(i)
    }
}
```

</ToggleContent> 

---

## ES2017 ✅


<ToggleContent title="Object.values/Object.entries">

`Object` 新增两个静态方法

- `Object.values(o: any) => any[]` 返回可枚举对象的值的数组
- `Object.entries(o: any) => any[][]` 返回可枚举对象键值对（`[key,value]`）的数组

``` ts
const foo = { x: 5, y: 12 }

Object.keys(foo) // ['x', 'y']

Object.values(foo) // [5, 12]
Object.entries(foo) // [['x', 5], ['y', 12]]
```

</ToggleContent> 

<ToggleContent title="String padding">

字符串类型增加了两个用于填充字符串的方法。一个在前面填充，一个在后面填充

- `String.prototype.padStart(maxLength: number, fillString?: string) => string`
- `String.prototype.padEnd(maxLength: number, fillString?: string) => string`

``` ts
'foo'.padStart(4) // ' foo'
'foo'.padStart(7, 'hello ') // 'hellfoo'

'foo'.padEnd(4) // 'foo '
'foo'.padEnd(4, '12') // 'foo1'
```

</ToggleContent> 

<ToggleContent title="Object.getOwnPropertyDescriptors">

用来获取一个对象的所有自身属性的描述符。

- `Object.getOwnPropertyDescriptors(obj: any, prop: string) => Descriptor`

``` ts
const foo = { x: 5, y: 12 }
Object.getOwnPropertyDescriptors(foo, 'x')
// {value: 5, writable: true, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptors(foo, 'z')
// undefined
```


</ToggleContent> 

<ToggleContent title="Trailing commas in function parameter lists and calls">

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

</ToggleContent> 

<ToggleContent title="Async functions">

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

</ToggleContent> 

<ToggleContent title="Shared memory and atomics">

- [Atomics MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics)

SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象。对象，但它们可以用来在共享内存上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。

一个新的低级别Atomics命名空间对象和一个SharedArrayBuffer构造函数，来作为更高级别并发抽象的原始构建块。共享多个service worker和核心线程之间的SharedArrayBuffer对象的数据。在worker之间共享数据，改善worker之间的协调。

``` ts
new SharedArrayBuffer(length)
```

- [MDN Atomics](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics)


</ToggleContent> 

--- 

## ES2016 ✅


<ToggleContent title="数组添加 includes 方法 Array.prototype.includes">

`Array<T>.includes(searchElement: T, fromIndex?: number) => boolean`

``` ts
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false

[1, 2, NaN].includes(NaN) // true
[1, 2, NaN].indexOf(NaN) // -1

'abc'.includes('b') // true
'abc'.includes('b', 2) // false
```

Note: 
- `indexOf` 使用的是严格相等，`includes` 使用的是 `SameValueZero` 比较算法。前者的意思该元素在数组中第一次出现的索引是什么，后者强调数组是否包含某个元素
- [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 也添加了同样的方法

</ToggleContent> 

<ToggleContent title="数字类型支持乘方操作符 Exponentiation operator">


``` ts
// x ** y

let squared = 2 ** 2 // same as: 2 * 2, Math.pow(2, 3)

let cubed = 2 ** 3 // same as: 2 * 2 * 2, Math.pow(2, 3)


// x **= y

let a = 2
a **= 2 // same as: a = a * a;

let b = 3
b **= 3 // same as: b = b * b * b;
```