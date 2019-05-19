const {Service} = require('egg');
class NewsService  extends Service {
    async list(){
        let {ctx} = this;
        const {newsUrl} = this.config.news;
        let result = await ctx.curl(newsUrl,{
            method:'GET',
            dataType:'json'
        });
        return {code:0,data:result.data};
    }
}
module.exports = NewsService;
