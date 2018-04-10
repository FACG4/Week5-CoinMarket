const http = require('http');
const router = require('./router')
const port = process.env.port | 3000

http.createServer(router).listen(port,()=>{
  console.log(`listening to the ${port}`);
  
})
