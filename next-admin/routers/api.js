const router = require('koa-router')()
const axios = require('axios');
const {proxyData,configURI} = require('../serverTools')
const env = process.env.NODE_ENV
const test = process.env.NODE_TEST
const urllist = {
  proURI:'',
  testURI:'',
  devURI:''
}

axios.defaults.baseURL = configURI(env,test,urllist);
// web代理转发
router.post('/web/:path',   async ctx => {
  await proxyData(ctx,axios)
})
router.get('/web/:path', async ctx => {
  await proxyData(ctx,axios)
})
// users代理转发
router.get('/users/:path', async ctx => {
  await proxyData(ctx,axios)
})
router.post('/users/:path', async ctx => {
  await proxyData(ctx,axios)
})
module.exports = router