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