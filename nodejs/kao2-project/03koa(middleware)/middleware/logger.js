// log4js 是 Node.js 中一个成熟的记录日志的第三方模块。
const log4js = require("log4js");
const fs = require("fs");

// 日志文件的配置
log4js.configure({
    appenders: {
        cheese: {
            type: 'dateFile', // 日志类型 
            filename: `log/task`,  // 输出的文件名
            pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
            alwaysIncludePattern: true   // 是否总是有后缀名
        }
    },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');
// 错误处理模块
const errorToLogger = async (ctx,next) => {
    // 把logger对象挂载到ctx上下文中，从而在应用的其它地方都可以输出日志。
    ctx.logger = logger;
    ctx.body = fs.createReadStream('not exist');
    await next();
};

module.exports = {
    errorToLogger
}