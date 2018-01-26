'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, config: { restApi: { prefix } } } = app;
  router.redirect('/', '/index.html', 302);
  router.get('/visual/resource',controller.resource.get);
  router.get(prefix + '/user/currentUser', controller.api.user.currentUser);
  router.post(prefix + '/login/account', controller.api.user.accountLogin);
  router.get(prefix + '/widget/:id', controller.api.widget.get);
  // Start template
  router.post(prefix + '/template/add', controller.api.template.addTemplate);
  router.post(prefix + '/template/getAll', controller.api.template.getTemplates);
  router.post(prefix + '/template/getTemplateByName', controller.api.template.getTemplateByName);
  router.post(prefix + '/template/update', controller.api.template.updateTemplate);
  // End template
  // Start prototype
  router.post(prefix + '/prototype/add', controller.api.prototypes.addPrototype);
  router.post(prefix + '/prototype/getAll', controller.api.prototypes.getPrototypes);
  router.post(prefix + '/prototype/getPrototypeById', controller.api.prototypes.getPrototypeById);
  router.post(prefix + '/prototype/update', controller.api.prototypes.updatePrototype);
  // End prototype

};
