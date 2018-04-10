const handler = require('./handler');

const router = (req, res)=>{
  const endpoint = req.url ;
  if(endpoint === '/'){
    handler.serveFiles('/index.html',res)
  }else if(endpoint === "/search"){
    handler.request('https://api.coinmarketcap.com/v1/ticker/')
    //res.end(data)
  }else {
    handler.serveFiles(endpoint, res)
  }
}
module.exports = router
