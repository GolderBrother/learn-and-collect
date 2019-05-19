module.exports = app => {
  const { router, controller } = app;
  const auth=app.middleware.auth({},app);
  router.get('/', controller.home.index);
  router.post('/signup',controller.user.signup);
  router.post('/login',controller.user.login);
  router.get('/captcha',controller.user.captcha);
  /* router.get('/user',controller.user.index);
  router.post('/user',controller.user.create);
  router.put('/user/:id',controller.user.update);
  router.delete('/user/:id',controller.user.destroy); */
  //获取所有的用户列表
  router.get('/role/getUser',auth,controller.role.getUser);
  router.post('/role/setUser',auth,controller.role.setUser);

  router.get('/role/getResource',auth,controller.role.getResource);
  router.post('/role/setResource',auth,controller.role.setResource);

  router.resources('user', '/user', auth,controller.user);
  router.resources('role', '/role', auth,controller.role);
  router.resources('resource', '/resource', auth,controller.resource);
  router.resources('roleUser', '/roleUser', auth,controller.roleUser);
  router.resources('roleResource', '/roleResource',auth, controller.roleResource);
};
