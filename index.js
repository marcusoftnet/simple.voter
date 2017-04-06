const _ = require('koa-route')
const render = require('./lib/render')
const Koa = require('koa')
const app = new Koa()

// Set up monk
const monk = require('monk')
const wrap = require('co-monk')
// var mongoProdUri = process.env.MONGOHQ_URL || 'localhost:27017/koaVote_Prod';
const db = monk('localhost/koaBlog')
var posts = wrap(db.get('topics'))

const routes = {
  home: (ctx) => {
    ctx.body = 'HELLO FROM ROUTES'
  },
  castVote: (ctx, topic) => {
    ctx.body = 'CASTING VOTE' + topic
  }
}
// route middleware
app.use(_.get('/', routes.home))
app.use(_.get('/:topic', routes.castVote))

// listen
const port = process.env.PORT || 3000
app.listen(port)
console.log(`listening on port ${port}`)
