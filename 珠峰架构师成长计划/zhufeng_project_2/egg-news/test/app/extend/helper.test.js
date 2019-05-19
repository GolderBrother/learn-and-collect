const {app,assert} = require('egg-mock/bootstrap');
describe('helper',function(){
    it('zh-cn',async function(){
       let ctx = app.mockContext({
          headers:{
            'accept-language':"zh-cn"
         }
       });
       assert(ctx.helper.money(100) == `￥ 100`);
    });
    it('other',async function(){
      let ctx = app.mockContext(
         {
            headers:{
               'accept-language':"en"
            }
         }
      );
      assert(ctx.helper.money(100) == `$ 100`);
   });
});