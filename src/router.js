const handler = require('./handler');
const https = require('https')

const router = (req, res)=>{
  const endpoint = req.url ;
  if(endpoint === '/'){

      handler.serveFiles('/index.html',res)


  }else if(endpoint === '/data'){

    handler.getData('https://api.coinmarketcap.com/v1/ticker/?limit=10',(data)=>{

      res.end(data)
    });


  } else if(endpoint === "/convert"){
      handler.serveFiles('/convert.html',res)

  }else if(endpoint === "/c"){
    let allData = '' ;
    req.on("data",(chunk)=>{
    allData += chunk  ;
  }).on('end',()=>{
    // console.log(allData);
      let splitedData = allData.split(".")
      console.log(splitedData[0],splitedData[1]);
      handler.getData(`https://min-api.cryptocompare.com/data/price?fsym=${splitedData[0]}&tsyms=${splitedData[1]}`,(data)=>{
      res.end(data);
      // console.log(data);
    });
  })


}else if(endpoint === "/search"){
    let allData = '' ;
    req.on("data",(chunk)=>{
    allData += chunk  ;
  }).on('end',()=>{
    // console.log(allData);

      handler.getData(`https://api.coinmarketcap.com/v1/ticker/${allData}/`,(data)=>{
      res.end(data);
      // console.log(data);
    });
  })


  }
    else {
    handler.serveFiles(endpoint, res)
  }
}
module.exports = router
