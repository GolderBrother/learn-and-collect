/**
Simple Server for web api test.
*/
/**Connect是一个node中间件（middleware）框架。
如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。
每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。
中间件就是类似于一个过滤器的东西，在客户端和应用程序之间的一个处理请求和响应的的方法。*/

var connect = require('connect');  //创建连接
var bodyParser = require('body-parser');   //body解析
var serveStatic = require('serve-static');   //目录访问（静态文件访问）
let map = new Map();

var data={
            "code": "200",
            "msg": "success"
        };

function strMapToObj(strMap) {
  let arr = [];
  for (let [k,v] of strMap) {
  	let obj = {};
    obj.key = k;
    obj.value = v;
    arr.push(obj);
  }
  return arr;
};

function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
};
var app = connect()
    .use(bodyParser.json())   //JSON解析
    .use(bodyParser.urlencoded({extended: true}))
    .use(serveStatic(__dirname))
    //__dirname 表示当前文件所在的目录的绝对路径
 	//__filename 表示当前文件的绝对路径
	//use()方法还有一个可选的路径字符串，对传入请求的URL的开始匹配。
	//use方法来维护一个中间件队列
	.use(function (req, res, next) {
		//跨域处理
		// Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');  //允许任何源
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  //允许任何方法
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token');   //允许任何类型
		res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});    //utf-8转码
		next();  //next 方法就是一个递归调用
	})
	.use('/map/add', function(req, res, next) {     //添加
		console.log(req.body.name);   //post请求
		//console.log(req.originalUrl, req.url);   //get请求
		//req.body POST数组   req.ip/ req.path/req.host/req.url
		map.set(req.body.name, req.body.message);
        res.end(JSON.stringify(data));
		next();
	})
	.use('/map/upd', function(req, res, next) { 
		console.log(req.body.name);
		//console.log(req.originalUrl, req.url);
		if (map.has(req.body.name)) {
			map.set(req.body.name, req.body.message);
		}
        res.end(JSON.stringify(data));
		next();
	})
	.use('/map/get', function(req, res, next) {
		console.log(req.originalUrl, req.url);
		console.log(strMapToJson(map));
        res.end(strMapToJson(map));
		next();
	})
	.use('/map/del', function(req, res, next) {
		console.log(req.body);
		if(map.has(req.body.name)) {
			map.delete(req.body.name);
		}
        res.end(JSON.stringify(data));
		next();
	})
	.use('/map/delAll', function(req, res, next) {
		map.clear();
        res.end(JSON.stringify(data));
		next();
	})
	.use('/map/add1', function(req, res, next) {
		var data={
			"code": "200",
			"msg": "success",
			"result": {
				"id":1,
			}
		};
		res.end(JSON.stringify(data));
		next();      //
	})
	.use('/map/add2', function(req, res, next) { 
		var data={
			"code": "200",
			"msg": "success",
			"result": {
				"name": "sonia",
				"content": "广告投放1"
			}
		};
		res.end(JSON.stringify(data));
		next();      //
	})
	.use('/map/lists', function(req, res, next) { 
		var data={
			"code": "200",
			"msg": "success",
			"result": [{
				"name": "sonia1",
				"content": "广告投放1"
			},
			{
				"name": "sonia2",
				"content": "广告投放2"
			},
			{
				"name": "sonia3",
				"content": "广告投放3"
			}]
		};
		res.end(JSON.stringify(data));
		next();      //
	})
	
    .listen(3000);
console.log('Server started on port 3000.');