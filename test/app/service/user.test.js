'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const mockUser = {
  userid: '00001',
  avatar: '/static/image/avatar/timg.jpg',
  notifyCount: 12,
  name: 'Shepard',
};


describe('test/app/service/user.test.js', () => {


  before(done => {
    app.mongo.insertOne('user', { doc: mockUser }).then(() => done());
  });

  after(done => {
    app.mongo.db.collection('user').deleteOne({ userid: '002' }, () => done());
  });

  it('insert test ', async () => {
    const ctx = app.mockContext({ user: { userid: '002' } });
    // invoke service
    const resp = await ctx.service.user.insertOne(ctx.user);
    assert(resp.insertedCount === 1);
  });

  it('find User test', async () => {

    const ctx = app.mockContext();
    // invoke service
    const user = await ctx.service.user.findUserById(mockUser.userid);
    assert(user.userid === mockUser.userid);
    assert(user.notifyCount === mockUser.notifyCount);
    assert(user.name === mockUser.name);
    assert(user.avatar === mockUser.avatar);
  });

  it('remove User test', async () => {
    const ctx = app.mockContext();
    // invoke service
    const resp = await ctx.service.user.deleteOne(mockUser.userid);
    assert(resp.deletedCount === 1);
  });


});
