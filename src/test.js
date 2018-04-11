const test = require('tape');
const router = require('./router');
const supertest = require('supertest');


test('',(t) => {
supertest(router)
.post('/')
.expect(200)
.end((err, res) => {
t.error(err)
t.equal(res.statusCode, 200, 'Should return 200');
t.end();

});
})



test(' ',(t) => {
supertest(router)
.get('/c')
.end((err, res) => {
t.error(err)
 t.equal(typeof res.body,'object','the type of response');
t.end();

});

});



test('',(t) => {
supertest(router)
.get('/c')
.expect(200)
.end((err, res) => {
t.error(err)
t.equal(res.statusCode, 200, 'Should return 200');
t.end();

})
})
