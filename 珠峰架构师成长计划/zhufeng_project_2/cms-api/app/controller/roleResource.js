const BaseController = require('./base');

class RoleResourceController extends BaseController {
  constructor(...args){
    super(...args);
    this.model = 'roleResource';//我要在这里为每一个控制器设置一个模型值
  }
}

module.exports = RoleResourceController;
