const {Controller} = require('egg');

const crypto = require('crypto');
// let n = new NewsController(ctx,req,res);
//n.index()
class NewsController extends Controller {
  async env(){
    this.ctx.body = this.app.config.env+this.config.news.myUrl;
  }
  async index(){
    //this=NewsControlle上的实例 ，但是上面又自己挂了很多的方法和属性
     const {ctx,service} = this;
     let {code,data} = await service.news.list();
     if(code == 0 ){
      /*  data.forEach(item=>{
        item.createAt = ctx.helper.fromNow(item.createAt);
       }); */
       await ctx.render('news',{list:data});
     }else{
        ctx.body = '失败';
     }
     /**
      * 1. 查找到文件路径 
      * 2. 读取文件内容 fs.readFile()
      * 3. 把模板内容 和数据进行混合渲染,得到最终的HTML
      */
     
  }
  async counter(){
    let {ctx} = this;
    let count = ctx.cookies.get('count');
    count = count ? Number(count) : 0;
    count++;
    let res = crypto.createHmac('sha256',this.config.counterKeys).update(count+"").digest('hex');
    ctx.cookies.set('count',res);
    ctx.body = res;
  }
}
module.exports = NewsController;
/**
 * 响应对象
 * cookie: count=1; sid=xx
 */

 