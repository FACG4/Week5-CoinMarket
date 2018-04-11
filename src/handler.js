const fs = require('fs');
const path = require('path');
const http = require('https');

const contentType = {
  html:'text/html',
  css: 'text/css',
  jpg: 'images/jpg',
  png: 'images/png',
  ico: 'images/ico',
  js: 'text/javascript'
}

const serveFiles = (endpoint, res)=>{
  const filePath = path.join(__dirname, '..','public', endpoint);//end / /css/style.css /js/dom.js
  const fileExtention = endpoint.split('.')[1];// css js html
  res.writeHead(200,{'Content-Type':`${contentType[fileExtention]}`});
  fs.readFile(filePath, (error, file)=>{
    if (error){console.log(error);
    }
    res.end(file);
  });
}
// let data ;
const getData = (url , cb)=>{
  http.get(url,response=>{
    response.setEncoding("utf-8");
    let data = '';
    response.on('data',(chunck)=>{
      data += chunck;
    }).on('end',()=>{
      cb(data)
    }).on('error', (err)=>{
      console.log(err);
    })
  })
}

//convert function

//
// const request = (url)=>{
//   getCurrency(url,(err,response,body)=>{
//      // console.log(body);
//      data = body
//   })
//   return data
// }


module.exports={serveFiles,getData}
