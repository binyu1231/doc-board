---
title: Redis
---




## 使用

### Node.js 使用 redis

`npm:ioredis` 比 `npm:redis` 使用方法更加友好，也支持集群功能 

``` bash
$ npm i ioredis
```

``` ts
import Redis from 'ioredis'

export function redisContext(cb: (client: Redis) => Promise<any>) {
    const client = new Redis(6379, 'localhost')

    return cb(client)
        .then(() => {
            client.disconnect()
            return Promise.resolve()
        })
}

redisContext(async function (client) {
    const key = 'article:1'
    await client.set(key, String(Math.random()))
    await client.get(key)
    // 0.7489682238325692
    
})
```

## 数据类型

|结构类型|存储的值|结构的读写能力|
|:---|:---|:---|
|`string`|字符串，整数，浮点数|对整个字符串或者字符串的其中一部分执行操作；对整数和浮点数执行自增（increment）或者自减（ decrement） 操作|
|`list`|一个链表，链表上的每个节点都包含了一个字符串|从链表的两端推入或者弹出元素；根据偏移量对链表进行修剪（trim）；读取单个或者多个元素；根据值查找或者移除元素|
|`set`|包含字符串的无序收集器（ unordered collection）， 并且被包含的每个字符串都是独一无二、各不相同的|添加、获取、移除单个元素；检查一个元素是否存在于集合中；计算交集、并集、差集；从集合里面随机获取元素|
|`hash`|包含键值对的无序散列表|添加、获取、移除单个键值对；获取所有键值对|
|`zset`|字符串成员（member）与浮点数分值（score）之间的有序映射，元素的排列顺序由分值的大小决定|添加、获取、删除单个元素；根据分值范围（range）或者成员来获取元素|


## str

### 基本使用 

``` ts
redisContext(async (client) => {
    const key = 'str_test:1'
    await client.set(key, 'baz', 'EX', 20000) 
    await client.set(key, 'foo', 'KEEPTTL', 'XX', 'GET')
    // baz
    
    await client.get(key)
    // foo
})
```

### api

|command|args|desc|
|:---|:---|:---|
| `set` | `set key str [EX s/PX ms/KEEPTTL] [NX/XX] [GET] -> 'OK'/oldstr/null` | 设置字符串的值，可代替 `setex` `psetex` `getset` `setnx` 等<br> - `EX`: 过期时间(秒) <br> - `PX`: 过期时间(毫秒) <br> - `KEEPTTL`: 保留设置前的过期时间<br> - `NX`: key 不存在时才可设置 <br> - `XX` key存在时才可设置<br> - `GET`: 返回设置前的值, 不与 `NX` 一起使用|
| `mset` | `mset key str [key str ...] -> 'OK'` | **同时**设置多个字符串|
| `msetnx` | `msetnx key str [key str ...] -> 1/0` | 当且仅当所有给定键都不存在时， 为所有给定键设置值。|
| `setrange` | `setrange key offset str -> len` | 从指定位开始用新字符串覆盖旧字符串 |
| `append` | `append key str -> oldstrstr/str` | 追加字符串，如果没有则set |
| `get` | `get key -> str`| 获取key对应的字符串|
| `getset` | `getset key str -> oldstr` | 设置key，并返回设置前的字符串值|
| `getrange` | `getrange key start_index end_index -> substr` | 获取key对应字符串的子字符串|
| `mget` | `mget key [key ...] -> [key, ...]` | 获取多个key对应的字符串，空值由 null 占位|
| `strlen` | `strlen key -> len` | 获取key对应字符串长度，不存在则返回0|
| `incr` | `incr key -> int` | 将 key 中储存的数字值+1, 修改非数字字符串会报错，如果为空则设置为'1'|
| `incrby` | `incrby key int -> int` | 将 key 中储存的数字值+int , 修改非数字字符串会报错，如果为空则设置为int。 int可以为负数|
| `decr` | `decr key -> int` | 将 key 中储存的数字值-1, 修改非数字字符串会报错，如果为空则设置为'-1'|
| `decrby` | `decrby key int -> int` | 将 key 中储存的数字值-int , 修改非数字字符串会报错，如果为空则设置为-int。 int可以为负数|
| `incrbyfloat` | `incrbyfloat key float -> float` |将 key 中储存的数字值+float , 修改非数字字符串会报错，如果为空则设置为float。 float可以为负数|
| `setbit` | `setbit key offset 1/0 => 1/0` | 设置字符串指定偏移位上的 bit 值, 返回值为修改之前的值 |
| `getbit` | `getbit key offset -> 1/0` | 获取字符串指定偏移位上的 bit 值 |
| `bitcount` | `bitcount key [start_index, end_index] - offset` | 获取字符串的bit值数量。一般配合bitset 统计登录次数，阅读次数等。|
| `bitop` | `bitop AND/OR/NOT/XOR destkey key [key ...] -> dest_str_length` | 将多个字符串进行逻辑运算，并将结果保存到目标字符串中 | 
| `bitpos` | `bitpos key 1/0 [start, end]` -> position_number | 查找字符串中第一个被设置为1/0的bit位  |
| `bitfield*` | `bitfield` | 将字符串作为二进制位数组进行操作|
| `stralgo*` | `stralgo` | 用来实现基于字符串的复杂算法|

## list 

### 基本使用 

``` ts
redisContext(async (client) => {

    const genKey = () => `list_test:${Date.now()}`

    const key1 = genKey()

    await client.lpush(key1, 'red', 'blue') // 2
    // ['blue', 'red']
    await client.lpush(key1, 'orange', 'pink') // 4
    // ['pink', 'orange', 'blue', 'red']
    
    await client.rpush(key1, 'yellow', 'black') // 6
    // ['pink', 'orange', 'blue', 'red', 'yellow', 'black']

    await client.lrange(key1, 1, -2) // ['orange', 'blue', 'red', 'yellow']

    await client.del(key1)
})
```


### api

|command|args|desc|
|:---|:---|:---|
|`lpush`|`lpush key member [member, ...] -> length`|从头部添加元素|
|`lpushx`|`lpushx key member [member, ...] -> length`|当key存在并为 list 时，从头部添加元素|
|`rpush`|`rpush key member [member, ...] -> length`|length 从尾部添加元素|
|`rpushx`|`rpushx key member [member, ...] -> length`|length 当key存在并为 list 时，从尾部添加元素|
|`lpop`|`lpop key -> member`|从头部删除并返回元素|
|`rpop`|`rpop key -> member`|从尾部删除并返回元素|
|`lmove`|`lmove source desination sfrom[LEFT/RIGHT] dto[LEFT/RIGHT] -> member`|从原始列表向目标列表移动元素。只能从头尾进行移动|
|`blpop`|`blpop key [key, ...] timeout`|是 lpop 的阻塞版本，timeout 最长等待时间|
|`brpop`|`brpop key [key, ...] timeout`|是 rpop 的阻塞版本，timeout 最长等待时间|
|`blmove`|lmove arguments `timeout`|是 lmove 的阻塞版本，timeout 最长等待时间|
|`lindex`|`lindex key member_index -> member`|使用数字索引查找成员|
|`llen`|`llen key -> length` | 查询列表长度|
|`lrange`|`lrange key start_index end_index -> member_list` | 指定区间内的成员|
|`lrem`|`lrem key count member -> rem_member_length` | 删除count个名称为 member 的成员。count = 0 全部成员，count>0 从头部删除， count<0 从尾部删除|
|`lset`|`lset key index member -> member` | 设置指定位置的成员值。索引越界时会报错|
|`ltrim`|`ltrim key start_index end_index -> 'OK'`|  修剪列表长度|
|`lpos`|`key member [RANK member_no] [COUNT member_count] [MAXLEN max_member_count] ->` `member_index / null / member_list`|查询成员位置|



<ToggleContent title="set">

``` ts
redisContext(async (client) => {
    const key = 'set_test:0'
    
    // 添加
    await client.sadd(key, '1')
    await client.sadd(key, '1')
    await client.sadd(key, '2', '3', '4')
    await client.sadd(key, ['4', '5', '6'])

    // 集合所有元素
    await client.smembers(key)
    // [ '1', '2', '3', '4', '5', '6' ]

    // 集合长度
    await client.scard(key)
    // 6

    // 验证成员 1:存在， 0:不存在
    await client.sismember(key, '4')
    // 1

    // 随机返回成员
    await client.srandmember(key, 2)
    //  [ '6', '2' ]


    /// 多集合操作
    const key1 = 'set_test:1'
    await client.sadd(key1, ['4', '5', '6', '7'])

    // 第一个集合与其他集合的差异
    await client.sdiff([key, key1/* , ... , keyN */])
    // [ '1', '2', '3' ]
    
  
    // 两个集合的交集
    await client.sinter([key, key1])
    // [ '4', '5', '6' ]
    

    // 两个集合的并集
    const uniMembers = await client.sunion(key, key1)
    // [ '1', '2', '3', '4', '5', '6', '7' ]

})
.then(() => redisContext(async (client) => {
    // 副作用操作
    // keyResult 如果原来有数据会被覆盖

    const keySource = 'set_test:source'
    const keyDestination = 'set_test:destination'
    const keyResult = 'set_test:result'

    await client.sadd(keySource, ['1', '2', '3'])
    await client.sadd(keyDestination, ['2', '3', '4'])
    
    // source 与 destination 差异，'4' 并不是 source 内容
    await client.sdiffstore(keyResult, keySource, keyDestination)
    // 1
    // result: ['1']
    // source: ['1', '2', '3']
    // destination: ['2', '3', '4']

    // souce 与 destination 的交集
    await client.sinterstore(keyResult, keySource, keyDestination)
    // 2
    // result: ['2', '3']
    // source: ['1', '2', '3']
    // destination: ['2', '3', '4']

    // souce 与 destination 的并集
    await client.sunionstore(keyResult, keySource, keyDestination)
    // 4
    // result: ['1','2', '3', '4']
    // source: ['1', '2', '3']
    // destination: ['2', '3', '4']
}))
.then(() => redisContext(async (client) => {
    
    const keySource = 'set_test:move_source'
    const keyDestination = 'set_test:move_destination'
    
    await client.sadd(keySource, ['1', '2', '3'])
    await client.sadd(keyDestination, ['a', 'b', 'c'])
    
    // 移动成员
    const moveStatus = await client.smove(keySource, keyDestination, '3')
    // 1
    // source: ['1', '2']
    // destination: ['a', 'b', 'c', '3']
    
    // 删除成员
    const remCount = await client.srem(keyDestination, 'a', '3', '999')
    // 2, // 不存在 '999'
    console.log('sets remove count: [sRem]', remCount)

    // 随机删除成员
    await client.spop(keySource, await client.scard(keySource))
    await client.spop(keyDestination, 2)

}))
```

</ToggleContent> 

<ToggleContent title="hash">

```ts
redisContext(async (client) => {

    const key = 'hash_test:0'

    await client.hset(key, {
        'red': 'あかい',
        'blue': 'あおい',
        'yello': 'きいろい',
    })

    await client.hgetall(key)
    // { red: 'あかい', blue: 'あおい', yello: 'きいろい' }

    await client.hexists(key, 'red')
    // 1

    await client.hkeys(key)
    // [ 'red', 'blue', 'yello' ]
    
    await client.hvals(key)
    // [ 'あかい', 'あおい', 'きいろい' ]
    
    await client.hlen(key)
    // 3

    await client.hget(key, 'red')
    // 'あかい'
    await client.hget(key, 'orange')
    // null

    await client.hmget(key, 'red', 'orange')
    // [ 'あかい', null ]

    await client.hsetnx(key, 'red', '赤い') // 0 设置失败
    await client.hsetnx(key, 'orange', 'オレンジいろい') // 1 设置成功
    // { red: 'あかい', blue: 'あおい', yello: 'きいろい', orange: 'オレンジいろい' }


    await client.hstrlen(key, 'orange')
    // 21 'オレンジいろい'

    await client.hset(key, { count: 0 })

    await client.hincrby(key, 'count', 3)
    // 3
    await client.hincrby(key, 'count', 1)
    // 4

    await client.hdel(key, 'count')
    // 1
})

```

</ToggleContent> 




## 事务