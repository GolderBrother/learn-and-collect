let moment = require('moment');
moment.locale('zh-cn');
//exports上的属性会被合并到helper对象上
exports.fromNow = dateTime =>  moment(dateTime).fromNow();

exports.money = function(amount){
  const lang = this.ctx.get('accept-language');
  if(lang.includes('zh-cn')){
    return `￥ ${amount}`;
  }else{
    return `$ ${amount}`;
  }
}