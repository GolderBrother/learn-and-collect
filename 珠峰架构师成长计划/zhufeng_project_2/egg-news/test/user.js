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
     let csrf = Date.now()+Math.random()+'';
     ctx.session.csrf = csrf;
     await  this.ctx.render('user/add',{csrf});
   }
   //确定添加用户
   async doAdd(){
     let {ctx} = this;
     let user = ctx.request.body;//得到请求体对象
     if(user.csrf == ctx.session.csrf){
        delete user.csrf;
        ctx.session.csrf = null;
        user.id = users.length>0?users[users.length-1].id+1:1;
        users.push(user);
        ctx.body = user;
     }else{
         ctx.status = 403;
         ctx.body = 'Not Allowed!';
     }
   
   }
}
module.exports = UserController;