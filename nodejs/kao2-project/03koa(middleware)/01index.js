// 常用中间件 1.koa-json 返回json格式的数据
const Koa = require('koa');
const Router = require('koa-router');
const koaJson = require('koa-json');
const app = new Koa();
const router = new Router();

// 自动将我们返回的数据转换为json格式。
app.use(koaJson()); // {"name":"james"}  Content-Type: application/json; charset=utf-8
router.get('/',(ctx,next) => {
	ctx.body=ctx.query;
})


app.use(router.routes()).
use(router.allowedMethods());

app.listen(3000, () => {
	console.log('server is running at http://localhost:3000')
});