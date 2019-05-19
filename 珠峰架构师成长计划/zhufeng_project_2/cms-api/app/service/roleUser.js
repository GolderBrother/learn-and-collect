const BaseService = require('./base');
class RoleUserService extends BaseService {
    constructor(...args){
      super(...args);
      this.table = 'role_user';
    }
}
module.exports = RoleUserService;
