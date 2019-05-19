const path = require('path');
const webpack = require('webpack');
//用来合并配置文件
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const dev = require('./webpack.dev.config');
const prod = require('./webpack.prod.config');
let other = '';
other = process.env.NODE_ENV === 'development' ? dev : prod;
console.log(merge(base, other));
module.exports = merge(base, other);