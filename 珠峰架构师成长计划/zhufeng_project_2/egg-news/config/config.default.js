module.exports = app => {
  let config = {};
  config.keys = 'zfpx';//指定秘钥
  config.counterKeys = 'counterKeys';
  config.view = {//配置模板引擎
    defaultExtension:'.html',//默认的后缀，是用来查找模板文件的位置的
    defaultViewEngine:'nunjucks',//默认的模板引擎，
    mapping:{//什么样的模板文件后缀用什么样的模板引擎进行渲染
        '.html':'nunjucks'
    }
  }
  config.news = {
    newsUrl : 'http://localhost:3000/news'
  }
  config.security= {
    csrf:false
  }
  //默认情况 每次请求服务器都会生成一个新的 session
   config.session= {
   
   } 
  //指定启用哪些中间件
  config.middleware = ['robot'];
  config.robot = {
    ua:[/Firefox/]
  }
  return config;
}