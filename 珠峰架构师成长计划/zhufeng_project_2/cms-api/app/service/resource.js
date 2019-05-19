const BaseService = require('./base');
class UserService extends BaseService {
    constructor(...args){
      super(...args);
      this.table = 'resource';
    }
}
module.exports = UserService;
