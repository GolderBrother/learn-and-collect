const {Controller} = require('egg');
class HomeController extends Controller {
   async home(){
       this.ctx.body = 'home';
   }
}
module.exports = HomeController;

 