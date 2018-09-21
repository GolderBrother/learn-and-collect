//  ejs 模板引擎
const Koa =require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
 
app.use(views(path.join(__dirname,'./views'),{
	extension:'ejs'  //模板文件的ehou后缀名 表示使用哪种模板引擎
}));

app.use(async(ctx)=>{
	let title = 'hellow koa2';
	await ctx.render('index',{
		title
	})
})

app.listen(3000,() => {
	console.log("This server is starting at port 3000");
});