module.exports = app => {
  let config = {};
  config.news = {
    myUrl:'http://local',
    newsUrl : 'http://localhost:3000/news'
  }
  return config;
}