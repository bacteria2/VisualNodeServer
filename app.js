'use strict';
const historyFallback = require('koa2-history-api-fallback');
const LocalStrategy = require('passport-local').Strategy;
const start = Date.now();

module.exports = app => {
    app.beforeStart(async () => {
        // 应用会等待这个函数执行完成才启动
    });
    //spa html fallback
    app.use(historyFallback());
    // 挂载 strategy
    app.passport.use('local',new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback: true,
    }, (req, username, password, done) => {
        // format user
        const user = { username, password };
        app.logger.debug('%s %s get user: %j', req.method, req.url, user);
        app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        return  await ctx.service.user.verifyUser(user);
    });
    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    app.passport.serializeUser(async (ctx, user) => {
        return user.userid
    });
    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    app.passport.deserializeUser(async (ctx, userid) => {
        // 处理 user
        // return user;
        return ctx.service.user.getUserLoginInfo(userid)
    });
    app.logger.info('启动耗时 %d ms', Date.now() - start);
};
