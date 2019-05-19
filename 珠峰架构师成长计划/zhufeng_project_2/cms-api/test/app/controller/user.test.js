const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('should GET /user', async () => {
    const result = await app.httpRequest()
      .get('/user')
      .expect(200);
    assert(result.body.code == 0);
    assert(Array.isArray(result.body.data));
  });

});
