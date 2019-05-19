const {app,mock,assert} = require('egg-mock/bootstrap');
//异步测试有三种方式
//1. promise 2.callback 3 async await 
describe('app\controller\home.test.js',function(){
    it('promise',function(){
        return app.httpRequest().get('/home').expect(200).expect('home');
    });
    it('callback',function(done){
     app.httpRequest().get('/home').expect(200,done);
    });
    it('async&await',async function(){
        await app.httpRequest().get('/home').expect(200).expect('home');
    });
});