const test = require('tape');
const router = require('./router');
const supertest = require('supertest');

test('check status is 200 ?',(t) =>{
  supertest(router)
   .get("/")
   .expect(200)
   .expect('Content-Type', /html/)
   .end((err,res) =>{
     t.error(err)
     t.equal(res.text,'',)
     t.end();
   });
});
