// log4js 是 Node.js 中一个成熟的记录日志的第三方模块。
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";
logger.debug("Some debug messages");
//[2018-09-21T10:58:24.759] [DEBUG] default - Some debug messages