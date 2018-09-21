const Koa = require('koa');
const app = new Koa();
const router = require("koa-router")();

// use 方法，不管 get 还是 post 都会进入到这个请求里面
router.use("/index",async ctx => {
    // 获取 get 请求参数 
    let url = ctx.url;
    //1. 获取 get 请求参数 
    let request = ctx.request;
    let req_query = request.query; //ctx.request.query name=james&age=18 => {"name":"james","age":"18"}
    let req_querystring = request.querystring; //ctx.request.querystring  name=james&age=18 => "name=james&age=18"
    // 2.从上下文 ctx 中获得
    let ctx_query = ctx.query;  //ctx.query name=james&age=18 => {"name":"james","age":"18"}
    let ctx_querystring = ctx.querystring;  //ctx.querystring  name=james&age=18 => "name=james&age=18"

    ctx.body = {
        url,
        request,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
});

// 获取get请求参数 /article/:id 这种类型
router.use("/user/:name/:id",async ctx => {
    // 这个功能的实现是通过 path-to-regexp 来实现的。原理是把 URL 字符串转化成正则对象，然后再进行正则匹配，
    console.log(ctx.params); //http://localhost:3000/user/james/123 => {"name":"james","id":"123"}
    let ctx_params = ctx.params;
    ctx.body = {
        ctx_params    // es6 语法 相当于 ctx_params:ctx_params
    }
});

// all 方法用于处理上述方法无法匹配的情况，或者你不确定客户端发送的请求方法类型。比如有一个GET请求，优先匹配和router.get方法中url规则一样的请求，
// 如果匹配不到的话就匹配router.all方法中url规则一样的请求。
router.all("/*",async ctx => {
    ctx.status = 404;
    ctx.body = `<h1>404 Not Found</h1><p>${ctx.url}</p>`
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('This server is starting at port 3000');
});