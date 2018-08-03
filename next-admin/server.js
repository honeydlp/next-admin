const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const api = require('./routers/api')
const port = parseInt(process.env.PORT, 10) || 8868
const dev = process.env.NODE_ENV !== 'production'
const test = process.env.NODE_TEST === 'test'
const app = next({ dev })
const handle = app.getRequestHandler() //处理正常路由(没有自定义)请求渲染的html

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    server.use(bodyParser())
    // 接口转发
    server.use(api.routes(), api.allowedMethods())

    // 渲染
    router.get('/layout', async ctx => {
      await app.render(ctx.req, ctx.res, '/pageLayout', ctx.query)
        ctx.respond = false
      })

    router.get('/SendJpush', async ctx => {
      await app.render(ctx.req, ctx.res, '/subpage/other/sendJpush', ctx.query)
      ctx.respond = false
    })

    router.get('/searchUserInfo', async ctx => {
      await app.render(ctx.req, ctx.res, '/subpage/userManagement/userSearch', ctx.query)
      ctx.respond = false
    })

    router.get('/login', async ctx => {
      await app.render(ctx.req, ctx.res, '/login', ctx.query)
      ctx.respond = false
    })

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, (err) => {
      if (err) throw err
      console.info(`> Ready on http://localhost:${port}`)
    })
  })
