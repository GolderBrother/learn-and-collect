const log4js = require("log4js");

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
