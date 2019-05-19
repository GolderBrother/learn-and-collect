'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_zfpx';

  // add your config here
  config.middleware = [];
  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      database: 'cms',
      user: 'root',
      password: '',
    },
  };
  config.security = {
    csrf: false,
    //我这个服务器允许8000端口过来跨域访问
    domainWhiteList:['http://localhost:8000']
  };
  config.jwtSecret = 'zfpx';
  //允许客户端发送cookie
  config.cors = {
    origin:'http://localhost:8000',
    credentials:true,
  }
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: false,
    encrypt: false,
    renew:false
  };
  return config;
};
