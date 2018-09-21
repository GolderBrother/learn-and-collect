const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
// koa-onerror中间件，优化错误处理信息。
const onerror = require('koa-onerror');

// 错误处理模块
const { handleError } = require('./middleware/handleError');
// 记录错误日志模块
const { errorToLogger } = require('./middleware/logger');

// 监听运行错误
onerror(app);
router.use(errorToLogger);

router.get("/index",(ctx) => {
    const b = 2;
    sad
    ctx.body = ctx.url;
})

// koa 里面提供了 error 事件，当发生错误时，可以通过监听该事件，对错误进行统一的处理。
app.on("error",handleError)

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => {
    console.log('server is running at http://localhost:3000')
})