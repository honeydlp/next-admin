const qs = require('qs');

filterCtx = (ctx) =>{
  let req = ctx.request
  return {
    method:req.method,
    url:ctx.req.url,
    data:req.body
  }
}

proxyData = async (ctx,axios )=> {
  let islogin = ctx.params.path.indexOf('login') !== -1 ? true : false;
  if(!islogin){
    let token = ctx.cookies.get('sessionID');
    if(!token){
      ctx.redirect('/login')
      ctx.body = false
    }
    axios.defaults.headers.token = token
  }
  let req = filterCtx(ctx)
  let res = await axios({
    method :req.method,
    url:req.url,
    data:qs.stringify(req.data)
  })
  let javaData = res.data
  if(islogin&&javaData.result){
    ctx.cookies.set('sessionID',javaData.result,{httpOnly:true,maxAge: 24*60*60*1000})
  }
  ctx.body = javaData
}

configURI = function(env,test,urllist){
  let baseURI = ''
  if(env === 'production'){
    baseURI = urllist.proURI
    if(test === 'test'){
      baseURI = urllist.testURI
    }
  }else{
    baseURI = urllist.devURI
  }
  return baseURI
}

module.exports = {filterCtx,proxyData,configURI}