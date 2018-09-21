// 日志中间件 直接在控制台输出
const logger = require("koa-logger");
const Koa = require("koa");
const app = new Koa();

app.use(logger);