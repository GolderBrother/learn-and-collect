//引入一个debug模块
let debug = require('./debug');
let logger1 = debug('logger:1');
let logger2 = debug('logger:2');
//先判断当前的运行环境，查看环境变量中的DEUBG的值 ，看值 是否跟自己的名字匹配，如果匹配则输出日志，如果不匹配则不输出日志。
logger1('hello1');
logger2('hello2');