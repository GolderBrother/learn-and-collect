const {app,mock,assert} = require('egg-mock/bootstrap');
//如何测试控制器 ctx 请求上下文对象 context
describe('app\controller\home.test.js',function(){
     it('test ctx',async ()=>{
         //通过app模拟创建出来一个ctx
         let ctx = app.mockContext({
            session:{name:'zfpx'}
         });
         assert(ctx.method == 'GET');//默认请求方法为GET
         assert(ctx.url == '/');//默认URL为/
         assert(ctx.session.name == 'zfpx');
     });
});