## 静态文件中间件
- css image js 都属于静态文件
- 静态文件中间件是用来拦截对静态文件的请求，
如果是静态文件的话就直接把文件从硬盘读出来返回给客户端

## 模板引擎
- 这是一个插件，首先我们要启用这个插件
```js
cnpm i egg-view-nunjucks -S
```

启用插件
```js
exports.nunjucks = {
    enable:true,
    package:'egg-view-nunjucks'
}
```

配置插件
express
```js
let app = express();
app.set('view engine','html');
app.set('views','views');
app.engine('.html',require('ejs').__express);

app.get('/',function(req,res){
  res.render('index');
});
```

session
```js
let app = express();
app.use(session({
  secret:'zfpx'
}));
```
在egg的内部，默认是支持防csrf
- 在客户端请求服务器的时候，服务器会向客户端发送一个csrfToken
- 下次客户端再次访问服务 器的时候，服务器会较验这个token
```js

```