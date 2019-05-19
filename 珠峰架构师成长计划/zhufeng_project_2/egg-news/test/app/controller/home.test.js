const {app,mock,assert} = require('egg-mock/bootstrap');
//如何测试控制器 app.httpRequest()
describe('app\controller\home.test.js',function(){
     it('test get /home',async ()=>{
         //返回值就是响应对象 resonse
         let result = await app.httpRequest().get('/home');
         assert(result.status === 200);
         assert(result.text === 'home');
     });
});