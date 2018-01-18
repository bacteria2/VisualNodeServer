'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/mongocurd.test.js', () => {
  it('list user', async () => {
    const ctx = app.mockContext();
    const list = await ctx.service.mongocurd.listUser();
    assert(list.length > 0);
  });

  it('insert batch', async () => {
    const ctx = app.mockContext({ users: [{ name: 'test1', age: '45', te: '6575' }, { name: 'test2', age: '21', te: '763' }, { name: 'test2', age: '56', te: '23' }] });
    const result = await ctx.service.mongocurd.insertBatch(ctx.users);
    console.log(`成功插入记录数：${result}`);
  });

  it('delete users', async () => {
    const ctx = app.mockContext();
    const query = { name: 'test1' };
    const result = await ctx.service.mongocurd.delete(query);
    console.log(`成功删除记录数：${result}`);
  });

  it('update user', async () => {
    const ctx = app.mockContext();
    const query = { name: 'test2' };
    const result = await ctx.service.mongocurd.update(query, { $set: { name: 'tryrtyr' } });
    console.log(`成功更新记录数：${result}`);
  });
});
