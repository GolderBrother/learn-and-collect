const http = require('http');
// querystring模块用来转换URL字符串和URL中的查询字符串
// 1.8.1 parse方法用来把字符串转换成对象 #
// querystring.parse(str,[sep],[eq],[options]);
// 1.8.2 stringify方法用来把对象转换成字符串
// querystring.stringify(obj,[sep],[eq]);
// 1.9 querystring
// url.parse(urlStr,[parseQueryString]);
const querystring = require('querystring');
// href 被转换的原URL字符串
// protocal 客户端发出请求时使用的协议
// slashes 在协议与路径之间是否使用了//分隔符
// host URL字符串中的完整地址和端口号
// auth URL字符串中的认证部分
// hostname URL字符串中的完整地址
// port URL字符串中的端口号
// pathname URL字符串的路径，不包含查询字符串
// search 查询字符串，包含?
// path 路径，包含查询字符串
// query 查询字符串，不包含起始字符串?
// hash 散列字符串，包含#
const server = http.createServer((req, res) => {
    const str = querystring.parse(req.url);
    // const parseObj = querystring.parse(req.url,'query');
    // res.writeHead(400, 'set-cookie', 'name=james');
    // 判断响应头是否已经发送
    // console.log(res.headersSent);
    // console.log(str);

    // 1.10.2 Header
    // 设置、获取和删除Header
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    console.log(res.getHeader('Content-Type'));
    // 判断响应头是否已经发送
    console.log(res.headersSent);

    // 1.10.4 sendDate
    // 不发送Date

    // res.sendDate = false;

    // 1.10.5 write #
    // 可以使用write方法发送响应内容
    res.write('hello world', 'utf-8');
    // res.end('end', 'utf-8');

    // 1.10.7 close #
    // 在响应对象的end方法被调用之前，如果连接中断，将触发http.ServerResponse对象的close事件
    res.on('close', () => {
        console.log('close');
    })

response.on('close',callback);
})

server.listen(8080, '127.0.0.1', () => {
    console.log('The Server is listening on port 8080')
})