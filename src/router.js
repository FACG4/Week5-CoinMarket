const handler = require('./handler');
const https = require('https')

const router = (req, res)=>{
  const endpoint = req.url ;
  if(endpoint === '/'){

      handler.serveFiles('/index.html',res)


  }else if(endpoint === '/data'){

    handler.getCurrency('https://api.coinmarketcap.com/v1/ticker/?limit=10',(data)=>{

      res.end(data)
    });

  } else if(endpoint === "/search"){
    handler.getCurrency(`https://api.coinmarketcap.com/v1/ticker/${coin}`,(data)=>{

      res.end(data)
    });

  }else {
    handler.serveFiles(endpoint, res)
  }
}
module.exports = router
