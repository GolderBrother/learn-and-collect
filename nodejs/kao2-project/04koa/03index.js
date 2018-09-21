//  添加静态资源中间件

const Koa = require('koa');
const path =require('path');
const static = require('koa-static');
const app = new Koa();

const staticPath = './static';

// 指定静态资源目录 一般在app.js同级目录下创建一个public目录，用来存放静态文件。
// 访问 http://localhost:3000/index.html 这个地址， 会渲染 ./static/index.html　这个页面
app.use(static(path.join(__dirname,staticPath)));
app.use(async(ctx)=>{
	ctx.body='hello world';
})
app.listen(3000,() => {
	console.log("This server is starting at port 3000");
});