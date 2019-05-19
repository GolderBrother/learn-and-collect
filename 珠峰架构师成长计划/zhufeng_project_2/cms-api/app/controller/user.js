const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');
const {sign} = require('jsonwebtoken');
class UserController extends BaseController {
  constructor(...args){
    super(...args);
    this.model = 'user';//我要在这里为每一个控制器设置一个模型值
  }
  //通过此接口生成验证码,防止机器人
  async captcha(){
   let {ctx} = this;
   //生成的时候分成二部分 一个是答案就是文本要记录在后台，一部分就是图片
   let captcha = svgCaptcha.create({});
   ctx.session.captcha = captcha.text;
   ctx.set('Content-Type','image/svg+xml');
   ctx.body = captcha.data;
  }
  async login(){
    let {ctx,app} = this;
    let body = ctx.request.body;//取得请求体
    let result = await app.mysql.select('user',{
      where:{username:body.username,password:body.password},
      limit:1
    });
    if(result && result.length>0){
      let user = result[0];
      //此处要还要让user带上自己的权限TODO
      delete user.password;//在签名的时候把密码删除掉
      //我们把此用户拥有的菜单也放到user上
      //比如说当前登录的用户ID为1 的话
      //user.resources = [{id:1,name:'权限管理'},{id:2,name:'权限管理'},{id:3,name:'权限管理'},{id:4,name:'权限管理'}];
      //user.resources = [{id:1,name:'权限管理',children:[{id:2,name:'权限管理'},{id:3,name:'权限管理'},{id:4,name:'权限管理'}]}];
      //"payload" to be a plain object.{name:'zfpx'} RowDataPacket
      let resourcesList = await app.mysql.query(`SELECT resource.* FROM 
      role_user INNER JOIN role_resource ON role_user.role_id = role_resource.role_id
      INNER JOIN resource ON role_resource.resource_id = resource.id
      WHERE role_user.user_id = ?`,[user.id]);
      let resources = [];
      let map = {};
      resourcesList.forEach(item=>{
        item.children = [];
        map[item.id] = item;
        if(item.parent_id == 0){
          resources.push(item);
        }else{
          map[item.parent_id].children.push(item);
        }
      });
      user.resources = resources;
      user = JSON.parse(JSON.stringify(user));
      console.log(user);
      let token = sign(user,this.config.jwtSecret);
      this.success(token);
    }else{
      this.error('登录失败');
    }
  }
  async signup(){
    let {ctx,app} = this;
    let user = ctx.request.body;
    if(user.address)user.address = user.address.join('-');
    let captcha = user.captcha;
    delete user.captcha;
    delete user.confirm;
    if(captcha == ctx.session.captcha){
      const result = await app.mysql.insert('user',user);
      //affectedRows 如果大于0就成功，等于0就失败
      if(result.affectedRows>0){
        this.success('用户注册成功');
      }else{
        this.error('用户注册失败');
      }
    }else{
      this.error('验证码校验失败');
    }
    
  }
}

module.exports = UserController;
