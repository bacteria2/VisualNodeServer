'use strict';
module.exports = {
  async get(ctx) {
    const url = ctx.query.url;
    const result = await ctx.curl(url);
    ctx.set(result.headers);
    ctx.body = result.data;
    ctx.status = result.status;
  },
};
