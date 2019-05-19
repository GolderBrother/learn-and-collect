module.exports = app => {
  let config = {};
  config.news = {
    myUrl:'http://prod',
    newsUrl : 'http://localhost:3000/news'
  }
  return config;
}