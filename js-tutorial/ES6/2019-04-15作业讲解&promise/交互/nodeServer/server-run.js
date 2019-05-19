
/**Connect是一个node中间件（middleware）框架。
如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。
每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。
中间件就是类似于一个过滤器的东西，在客户端和应用程序之间的一个处理请求和响应的的方法。*/

var connect = require('connect');  //创建连接
var bodyParser = require('body-parser');   //body解析
var m = new Map();
//map转为数组对象
function mapToArr(m){
	var arr = [];
	for(let [key,value] of m){
		arr.push({name:key,message:value})
	};
	return arr;
};

var app = connect()
    .use(bodyParser.json())   //JSON解析
    .use(bodyParser.urlencoded({extended: true}))
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
	.use('/add', function(req, res, next) {
		console.log(req.body);
		m.set(req.body.name,req.body.message);
		var data = {
			"code": "200",
			"msg": "success"
		};
		res.end(JSON.stringify(data));
		next();
	})
	.use('/get', function(req, res, next) {
		var data={
			"code": "200",
			"msg": "success",
			"result": mapToArr(m)
		};
		res.end(JSON.stringify(data));
		next();      //
	})
	.use('/get_query', function(req, res, next) {
		var data={
			"code": "200",
			"msg": "success",
			"result":{"id":1}
		};
		res.end(JSON.stringify(data));
		next();      //
	})
    .listen(3000);   //
console.log('Server started on port 3000.');