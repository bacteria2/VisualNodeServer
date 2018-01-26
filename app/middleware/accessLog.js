// app/middleware/gzip.js

module.exports = options => {
    return async function logger(ctx, next) {
        ctx.logger.info('access to path: %j', ctx.request.path);
        await next()
    };
};