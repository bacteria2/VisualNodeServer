'use strict';
module.exports = {
   async get(ctx) {
        const url=ctx.query.url;
       let result= await  ctx.curl(url);
       ctx.set(result.headers);
       ctx.body=result.data;
       ctx.status = result.status;
    }
}
