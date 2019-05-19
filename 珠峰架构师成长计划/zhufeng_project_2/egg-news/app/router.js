module.exports = app => {
  const {router,controller} = app;
  router.get('/users',controller.user.list);
  router.get('/users/add',controller.user.add);
  router.post('/users/doAdd',controller.user.doAdd);
  //先走中间件，中间件走完之后呢
  router.get('/home',controller.home.home);
  router.get('/counter',controller.news.counter);
  //controller其实是一个对象
  router.get('/news',controller.news.index);
  router.get('/env',controller.news.env);
}