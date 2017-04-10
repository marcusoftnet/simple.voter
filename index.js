const _ = require('koa-route')
views = require('koa-views')
const Koa = require('koa')
const app = new Koa()

// Set up monk
const monk = require('monk')
const mongoUrl = process.env.MONGOHQ_URL || 'localhost:27017/koaVote_Prod';
const db = monk(mongoUrl)
const wrap = require('co-monk')
const topics = wrap(db.get('topics'))

const questionsList = [
  {
    "id": 1,
    "title": "My first question",
    "plusvotes": 40,
    "minusvotes": 30,
    "score": 0
  },
  {
    "id": 2,
    "title": "My second question",
    "plusvotes": 30,
    "minusvotes": 40,
    "score": 0
  },
  {
    "id": 3,
    "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod animi nisi quisquam eius distinctio eveniet, quo iusto. Doloribus in, nisi, laboriosam voluptas atque dignissimos eum recusandae velit, quidem quisquam necessitatibus!",
    "plusvotes": 30,
    "minusvotes": 40,
    "score": 0
  }
]

// Set up views with koa-views
app.use(views('./views', { map: { html: 'handlebars' } }))

// route middleware
app.use(_.get('/', async (ctx) => {
  let questions = await topics.find({})
  await ctx.render('home.html', { questions: questions })
}))
app.use(_.get('/:id/up', async (ctx, id) => {
  console.log('UP for ' + id)
  ctx.redirect('/')
}))
app.use(_.get('/:id/down', async (ctx, id) => {
  console.log('DOWN for ' + id)
  ctx.redirect('/')
}))

// listen
const port = process.env.PORT || 3000
app.listen(port)
console.log(`listening on port ${port}`)
