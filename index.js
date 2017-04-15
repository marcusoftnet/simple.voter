const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const handleErrors = require('./middlewares/handleErrors')
const config = require('config')
const db = require('./db')
const views = require('koa-views')

const app = new Koa()
const router = new Router()

// middlewares
app.use(handleErrors)
app.use(serve('./public'))
app.use(views('./views', { map: { html: 'handlebars' } }))

router.get('/', async (ctx) => {
  await ctx.render('home.html', { topics: await db.Topics.findAll() })
})
router.get('/:id/up', async (ctx) => {
  await db.Topics.upvote(ctx.params.id)
  ctx.redirect('/')
})
router.get('/:id/down', async (ctx) => {
  await db.Topics.downvote(ctx.params.id)
  ctx.redirect('/')
})
app.use(router.routes())

db
  .connect()
  .then(() => {
    app.listen(config.port, () => {
      console.info(`Listening to http://localhost:${config.port}`)
    })
  })
  .catch((err) => {
    console.error('ERR:', err)
  })
