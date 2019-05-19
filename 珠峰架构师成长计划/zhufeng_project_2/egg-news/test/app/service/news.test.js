const {app,mock,assert} = require('egg-mock/bootstrap');
describe('test/app/service/news.js',function(){
   it('test news service',async function(){
       let ctx = app.mockContext();
       let {code,data} = await ctx.service.news.list();
       assert(code == 0);
       assert(data.length == 3);
   });
});