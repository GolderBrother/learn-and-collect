const {app,mock,assert} = require('egg-mock/bootstrap');
//before beforeEach after afterEach
describe('app\controller\home.test.js',function(){
    //在整个测试脚本开始之前运行
    before(()=>{
        console.log('before');
    });
    //在每个单元测试开始之前执行
    beforeEach(function(){
        console.log('beforeEach');
    });
    it('test1',function(){
        console.log('test1!');
    });
    it('test2',function(){
        console.log('test2!');
    });
    //在每个单元测试执行完成之后执行
    afterEach(function(){
        console.log('afterEach');
    });
    //在整个测试脚本运行完毕之后执行
    after(()=>{
        console.log('after');
    });
});