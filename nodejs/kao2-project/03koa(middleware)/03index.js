const log4js = require("log4js");
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
})

const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

// 再次运行，在当前目录下会生成一个日志文件cheese.log文件，文件中有两条日志并记录了error及以上级别的信息，如下
// 我们可以通过自定义实现日志中间件，把logger对象挂载到ctx上下文中，从而在应用的其它地方都可以输出日志