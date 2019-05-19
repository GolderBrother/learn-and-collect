const BaseController = require('./base');
/**
 * 授权是什么样的操作？
 * 1. 给角色分配用户 
 * 2. 给角色分配资源 
 */
class RoleController extends BaseController {
  constructor(...args){
    super(...args);
    this.model = 'role';//我要在这里为每一个控制器设置一个模型值
  }

  async getUser(){//获取所有的用户
    const {ctx,service} = this;
    const result = await service.role.getUser();
    this.success(result);
  }
  async setUser(){
    const {ctx,service} = this;
    let body = ctx.request.body;//{roleId:1,userIds:[1,3]}
    const result = await service.role.setUser(body);
    this.success(result);
  }
  async getResource(){
    const {ctx,service} = this;
    const result = await service.role.getResource();
    this.success(result);
  }
  async setResource(){
    const {ctx,service} = this;
    let body = ctx.request.body;//{roleId:1,resourceIds:[1,3]}
    const result = await service.role.setResource(body);
    this.success(result);
  }
  
}

module.exports = RoleController;
