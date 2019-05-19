const {Controller} = require('egg');
//现在要测试一个GET和POST请求
let users = [];
class UserController extends Controller{
    //查看用户列表
   async list(){
       this.ctx.body = users;
   }
   //打开添加用户页面
   async add(){
    let {ctx} = this;
    ctx.session.csrf = 'csrf';
     await  this.ctx.render('user/add',{});
   }
   //确定添加用户
   async doAdd(){
     let {ctx} = this;
     console.log('ctx.session.csrf',ctx.session.csrf);
     let user = ctx.request.body;//得到请求体对象
     user.id = users.length>0?users[users.length-1].id+1:1;
     users.push(user);
     ctx.body = user;
   }
}
module.exports = UserController;