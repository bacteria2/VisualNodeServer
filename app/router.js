'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, config: { restApi: { prefix } } } = app;
  router.redirect('/', '/index.html', 302);
  router.get(prefix + '/user/currentUser', controller.api.user.currentUser);
  router.post(prefix + '/login/account', controller.api.user.accountLogin);
  router.get(prefix + '/widget/:id', controller.api.widget.getWidget);
};
