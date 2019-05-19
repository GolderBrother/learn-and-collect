const {app,assert} = require('egg-mock/bootstrap');
describe('application',function(){
    it('cache',async function(){
        app.cache.set('name','zfpx');
        assert(app.cache.get('name') == 'zfpx');
    });
});