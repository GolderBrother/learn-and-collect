const {app,mock,assert} = require('egg-mock/bootstrap');
//如何测试控制器 app.httpRequest()
describe('app/controller/user.test.js',function(){
     //  /users/add 方法
     it('test get /users/add',async ()=>{
         let result = await app.httpRequest().get('/users/add');
         assert(result.status === 200);
         assert(result.text.indexOf('username') != -1);
     });
     it('test post /users/doAdd',async ()=>{
        let result = await app.httpRequest()
        .post('/users/doAdd').send("username=zfpx1");
        assert(result.status === 200);
        assert(result.body.id == 1);
    });
});