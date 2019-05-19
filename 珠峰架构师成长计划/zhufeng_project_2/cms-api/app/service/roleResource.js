const BaseService = require('./base');
class RoleResourceService extends BaseService {
    constructor(...args){
      super(...args);
      this.table = 'role_resource';
    }
}
module.exports = RoleResourceService;
