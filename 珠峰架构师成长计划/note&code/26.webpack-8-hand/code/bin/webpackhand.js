#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const Compiler = require('../lib/Compiler');
//命令的当前工作目录
const root = process.cwd();
//匹配配置文件对象
let options = require(path.resolve(__dirname, '../webpack.config.js'));
let compiler = new Compiler(options);
compiler.run();