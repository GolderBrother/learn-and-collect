const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args){
    super(...args);
    this.model = 'roleUser';//我要在这里为每一个控制器设置一个模型值
  }
}

module.exports = UserController;
