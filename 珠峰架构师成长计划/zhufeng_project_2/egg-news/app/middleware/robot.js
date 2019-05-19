//options 代表本中间件的配置对象
//判断如果是Chrome浏览器访问，则返回403
module.exports = (options,app)=>{
   return async function(ctx,next){//next表示调用下一个中间件
    //ctx.get取当前请求的请求头字符
    //User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36
     let userAgent = ctx.get('user-agent')||'';
     const matched = options.ua.some(ua=>ua.test(userAgent));
     if(matched){
        ctx.status = 403;
        ctx.body = '对不起，你没有访问的权限!';
     }else{
         await next();
     }
   }
}