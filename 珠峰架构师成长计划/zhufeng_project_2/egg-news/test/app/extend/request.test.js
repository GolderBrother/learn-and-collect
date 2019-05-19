const {app,assert} = require('egg-mock/bootstrap');
describe('request',function(){
    it('isChrome',async function(){
       let ctx = app.mockContext({
           headers:{'User-Agent':'xxx chrome yyy'}
       });
       assert(ctx.request.isChrome === true);
    });
    it('isNotChrome',async function(){
        let ctx = app.mockContext({
            headers:{'User-Agent':'xxx firefox yyy'}
        });
        assert(ctx.request.isChrome === false);
     });
});