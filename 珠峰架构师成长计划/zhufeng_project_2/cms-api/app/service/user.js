const BaseService = require('./base');
class UserService extends BaseService {
    constructor(...args){
      super(...args);
      this.table = 'user';
    }
   
}
module.exports = UserService;
