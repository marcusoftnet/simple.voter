const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const handleErrors = require('./middlewares/handleErrors');
const config = require('config');
const db = require('./db');
const views = require('koa-views')

const app = new Koa();
const router = new Router();

// middlewares
app.use(handleErrors);
app.use(bodyParser());
app.use(views('./views', { map: { html: 'handlebars' } }))


router.get('/', async (ctx) => {
  let topics = await db.Topics.findAll();
  console.log(topics)
  await ctx.render('home.html', { topics: topics })
})
router.get('/:id/up', async (ctx, id) => {
  console.log('UP for ' + id)
  ctx.redirect('/')
})
router.get('/:id/down', async (ctx, id) => {
  console.log('DOWN for ' + id)
  ctx.redirect('/')
})

app.use(router.routes());

db
  .connect()
  .then(() => {
    app.listen(config.port, () => {
      console.info(`Listening to http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('ERR:', err);
  });
