---
title: mongodb
---

## startup

``` bash
$ npm i mongodb -S
$ npm i @types/node -D
```


## 连接 mongodb atlas

``` ts
import { MongoClient } from 'mongodb'

// https://www.mongodb.com/atlas
const url = 'mongodb+srv://<username>:<password>@<cluster_address>';
const dbName = '<database_name>'

const client = new MongoClient(url)

async function main() {
  await client.connect()

  const db = client.db(dbName)
  const match = db.collection('<table_name>')

  await match.insertOne(/* insert_content */)
  await client.close()

}

main()
```

## CRUD

``` ts
```