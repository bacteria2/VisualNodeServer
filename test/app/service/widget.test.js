'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {

  it('getList test ', async () => {
    const ctx = app.mockContext();
    // invoke service
    const resp = await ctx.service.widget.getWidgetList({},0,10);
    console.log(resp);
  });


});
