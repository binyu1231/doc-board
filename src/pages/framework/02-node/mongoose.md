

``` js
// database.js
import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017/blog'
mongoose.Promise = global.Promise

mongoose.connect(uri)

export default mongoose
```


``` js
// model.js
import db from './database'

const schema = new db.Schema({
  aid: { type: String, require: true },
  comment: { type: String, require: true },
  visitorName: { type: String, require: true },
  visitorMail: { type: String, require: true },
  date: { type: Number, require: true }
})

export default db.model('comments', schema)
```

``` js
// router.js
import CommentModel from './model'


router.route('/blog/comment/:aid')
.get((req, res) => {

  console.log(req.params)
  CommentModel.find({ aid: req.params.aid })
  .then(docs => {
    res.send({ 
      message: '获取评论成功', 
      data: docs.map(formatDocument)
    })
  })
  .catch(error => {
    res.status(404).send({ 
      message: '获取评论失败', 
      ori: req.params,
      error
    })
  })
})
.post((req, res) => {
  let error = null
  const { aid } = req.params
  const { visitorName, visitorMail, comment } = req.body

  if (!visitorName || !nameReg.test(visitorName)) error = '没有提供名字，或者过长'
  else if (!visitorMail || !mailReg.test(visitorMail)) error = '没有提供邮箱，或者格式不正确'
  else if (!comment || !cmmtReg.test(comment)) error = '没有评论，或者评论过长 <200'
  
  if (error) return res.status(403).send({ message: error, ori: req.body })

  const commentModel = new CommentModel({ 
    aid, 
    visitorName, 
    visitorMail, 
    comment,
    date: new Date()
  })

  commentModel.save()
  .then(doc => res.send({ message: '评论成功', data: formatDocument(doc) }))
  .catch(error => {
    res.status(403).send({
      message: '评论失败',
      ori: res.body,
      error
    })
  })
})

```